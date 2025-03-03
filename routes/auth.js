const express = require("express");
const router = express.Router();
const controller = require("../controller/auth");

router.post("/send/email/otp", async (req, res) => {
  try {

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const contactNumber = req.body.contactNumber;

    if (!(email && password)) {
      throw new Error("invalid request body");
    }

    const sendOtp = await controller.sendEmailOtp(
      email,
      password,
      name,
      contactNumber
    );

    if (sendOtp) {
      return res.send({
        status: true,
        secret: sendOtp,
        message: "successfully send otp",
      });
    }
    return res.send({ status: false, message: "something went wrong!" });
  } catch (error) {
    return res.send({ status: false, message: error.message || error });
  }
});

router.post("/verify/email/otp", async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const jwtSecret = req.body.jwtSecret;

    const verifyOtp = await controller.verifyEmailOtp(
      email,
      otp,
      jwtSecret
    );

    if (verifyOtp.status) {
      return res.send({
        status: true,
        secret: verifyOtp.secret,
        message: "otp verified successfullly",
      });
    }
    return res.send({ status: false, message: "incorrect otp" });
  } catch (error) {
    return res.send({ status: false, message: error.message || error });
  }
});


router.post("/verify/email/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
      return res.send({ status: false, message: "invalid request body!" });
    }

    // Call the updated controller method for email login verification
    const loginResult = await controller.verifyEmailLogin(email.toLowerCase(), password);

    if (loginResult.status) {
      return res.send({
        status: true,
        secret: loginResult.secret,
        userId: loginResult.userId,
        name: loginResult.name,
        message: "Successfully login",
      });
    }
    return res.send({ status: false, message: "invalid email or password!" });
  } catch (error) {
    if(error.message == "address not exist") {
      return res.send({ status: false, message: error.message || error, is_address_exist: false });
    }
    return res.send({ status: false, message: error.message || error });
  }
});

// router.post("/signIn/google", async (req, res) => {
//   try {

//     const email = req.body.email;
//     const name = req.body.givenName;
//     const deviceToken = req.body.device_token;
//     const gender = req.body.gender;
//     const contactNumber = req.body.contactNumber;

//     if(!( email && name)) {
//       throw new Error('Something went wrong! Please try again later')
//     }
//     const result = await controller.signInWithGoogle(
//       email,
//       name,
//       contactNumber,
//       gender,
//       deviceToken
//     );

//     return res.send({
//       status: true,
//       secret: result.secret,
//       userId: result.userId,
//       name: result.name,
//       message: "Successfully login",
//     });
    
//   } catch (error) {
//     console.log(error, 'any error so far')
//     return res.send({ status: false, message: error.message || error });
//   }
// });

module.exports = router;
