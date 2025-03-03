const jwt = require("jsonwebtoken");
const { user } = require("../models/user");
const moongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { sendEmail} = require("../service/sendgrid");
// const notificationController = require("../controller/notification");

const sendEmailOtp = async (email, password, name, contactNumber) => {
  try {
    const isUserExist = await user.findOne({ email: email }).lean();
    email = email.toLowerCase();

    if (isUserExist && isUserExist.social_account) {
      throw new Error("Please use social account to login!");
    }

    if (isUserExist && isUserExist.status == 1) {
      throw new Error("user already exist");
    }

    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, result) => {
          if (err) {
            reject(error);
            throw new Error("something went wrong!");
          }

          const otp = Math.floor(1000 + Math.random() * 9000);
          console.log(otp, 'opt value is here')
          const secret = jwt.sign(
            { otp: otp, email: email },
            process.env.JWT_SECRET,
            {
              expiresIn: "5m",
            }
          );

          await sendEmail(email, { otp: otp }, "register", "Verify Your Email to Complete Your Sign-Up on ShareWheelz");
          
          let newUser;
          if (isUserExist && isUserExist.status == 0) {
            await user.updateOne(
              { _id: moongoose.Types.ObjectId(isUserExist._id) },
              {
                email: email,
                password: result,
                status: 0,
                name: name,
                contact_number: contactNumber,
              }
            )
            newUser = { _id: isUserExist._id}
          } else {
             newUser = await new user({
              email: email,
              password: result,
              status: 0,
              name: name,
              contact_number: contactNumber
            }).save();
          }
          resolve(secret);
        });
      });
    });
  } catch (error) {
    throw new Error(error.message || error);
  }
};

const verifyEmailOtp = async (email, otp, jwtSecret) => {
  try {

    const secret = jwt.verify(jwtSecret, process.env.JWT_SECRET);
    email = email.toLowerCase();

    if (secret.email == email && secret.otp == otp) {
      const body = {
        status: 1
      };
      const insertUser = await user.findOne({ email: email }).lean();

      if (!insertUser) {
        return {
          status: false,
          message: "something went wrong please try again later",
        };
      }
      
      //here we need to find any refferalcode he applied and update both the users with this refferalCode and all
      
      await user.updateOne({ email: email }, body);

      const jwtSign = jwt.sign( { token: insertUser._id },  process.env.JWT_TOKEN_SECRET);

      //push notification here
    //   let notificationBody = {
    //     title: `Welcome, ${insertUser.name} to Sharewheelz! 🚗`,
    //     description:
    //       "Were thrilled to have you onboard. Get ready to simplify your daily commute, save money, and make new connections. Whether you are a carpooling pro or new to ride-sharing, we are here to make your journey smoother.",
    //     seen: false,
    //     type: "single",
    //     user_id: insertUser._id,
    //     name: insertUser.name
    //   };

    //   await notificationController.postNotification(notificationBody);

      return {
        status: true,
        secret: jwtSign,
        message: "otp verified successfully",
      };

    }
    return { status: false, message: "invalid otp" };
  } catch (error) {
    throw new Error(error.message || error);
  }
};

const verifyEmailLogin = async (email, password, deviceToken) => {
  try {
    const isUserExist = await user.findOne({ email: email, deleted: { $exists: false } }).lean();

    if (!isUserExist) {
      throw new Error("No user found with this email");
    }

    if (isUserExist.social_account) {
      throw new Error("Please use social account to login!");
    }

    const passwordMatch = await bcrypt.compare(password, isUserExist.password);
    if (!passwordMatch) {
      throw new Error("Password is not correct");
    }

    // Update the device token here if needed
    if (deviceToken) {
      await user.updateOne({ email: email }, { device_token: deviceToken });
    }

    // Generate JWT token for authentication
    const jwtSign = jwt.sign({ token: isUserExist._id }, process.env.JWT_TOKEN_SECRET);

    return {
      status: true,
      secret: jwtSign,
      userId: isUserExist._id,
      name: isUserExist.name,
      message: "login successfully",
    };
  } catch (error) {
    throw new Error(error.message || error);
  }
};

module.exports = {
  sendEmailOtp,
  verifyEmailOtp,
  verifyEmailLogin
};
