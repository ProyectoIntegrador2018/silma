import nodemailer from "nodemailer";

export const sendEmail = async (request) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD
    },
    tls: { rejectUnauthorized: false }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: request.email,
    subject: request.subject,
    text: request.text,
    html: request.html,
    attachments: request.attachments
  });

}

