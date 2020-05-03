"use strict";
const nodemailer = require("nodemailer");

export const sendEmail = async (request) => {

  let transporter = nodemailer.createTransport({
    host: "tuna.exacthosting.com",
    port: 465,
    secure: true, 
    auth: {
      user: "manuscritos@silmaed.com", 
      pass: "Fr33fora11!" 
    }
  });

  await transporter.sendMail({
    from: "manuscritos@silmaed.com", 
    to: request.email, 
    subject: request.subject, 
    text: request.text, 
    html: request.html 
  });

}

