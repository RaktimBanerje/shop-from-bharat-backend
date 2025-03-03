
const fetch = require("cross-fetch");
const { signUp } = require("../template/signup");
const apiKey = "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";

const sendEmail = async (to, body, type, subject = "Registration") => {
  try {
    let templateBody;

    if (type === "register") {
      templateBody = signUp(body.otp);
    }

    if (!templateBody) {
      throw new Error("Something went wrong!");
    }

    const message = {
      sender: {
        email: "Shopfromindia435@gmail.com",
        name: "Shop From Bharat",
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      htmlContent: templateBody,
    };

    fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then(() => console.log("Mail sent successfully"))
      .catch((error) => {
        console.error("error is here", error);
      });

  } catch (error) {
    console.log(error, "error is here");
    throw error;
  }
};

const sendCommonEmail = (body, email, name, subject) => {
  try {
    let templateBody = contactemail({
      name: name,
      email: email,
      body: body,
    });
    const message = {
      sender: {
        email: "Shopfromindia435@gmail.com",
        name: "shop From Bharat",
      },
      to: [
        {
          email: "info@sharewheelz.in",
        },
      ],
      subject: subject,
      htmlContent: templateBody,
    };
    fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then(() => console.log("Mail sent successfully"))
      .catch((error) => {
        console.error("error is here", error);
      });

  } catch (error) {
    console.log(error, "error is here");
    throw error;
  }
};

module.exports = { sendEmail, sendCommonEmail };
