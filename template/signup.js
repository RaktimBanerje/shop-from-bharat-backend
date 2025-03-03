const signUp = (OTP) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #be6464;
                padding: 20px;
                text-align: center;
            }
            .header img {
                max-width: 150px;
            }
            .header h1 {
                color: #ffffff;
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content h2 {
                color: #333;
                margin-bottom: 20px;
            }
            .otp {
                font-size: 28px;
                color: #be6464;
                font-weight: bold;
                margin: 20px 0;
                letter-spacing: 2px;
            }
            .cta {
                display: inline-block;
                padding: 10px 20px;
                color: #ffffff;
                background-color: #be6464;
                border-radius: 5px;
                text-decoration: none;
                margin-top: 20px;
            }
            .cta:hover {
                background-color: #a34f4f;
            }
            .footer {
                background-color: #f4f4f4;
                text-align: center;
                padding: 20px;
                color: #999;
                font-size: 12px;
            }
            .footer a {
                color: #be6464;
                text-decoration: none;
            }
            .footer a:hover {
                text-decoration: underline;
            }
            @media only screen and (max-width: 600px) {
                .container {
                    padding: 10px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="" alt="ShopFromBharat Logo">
                <h1>Welcome to ShopFromBharat!</h1>
            </div>
            <div class="content">
                <h2>Verify Your Email</h2>
                <p>Thank you for signing up with ShopFromBharat. Please use the following OTP to verify your email address:</p>
                <div class="otp">${OTP}</div>
                <p>If you did not sign up for ShopFromBharat, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 ShopFromBharat. All rights reserved.</p>
                <p><a href="https://www.shopfrombharat.in/">Contact Us</a> | <a href="https://www.shopfrombharat.in/privacy">Privacy Policy</a></p>
            </div>
        </div>
    </body>
    </html>    
    
  `
}

module.exports =  { signUp }
