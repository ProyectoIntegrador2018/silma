import nodemailer from "nodemailer";
import Email from "email-templates";
import path from "path";
const templatesDir = path.resolve(__dirname, '../email-templates');

export const sendEmail = async (request, htmlFile, data) => {
  const email = new Email({
    views: {
      root: templatesDir,
      options: {
        extension: 'hbs'
      }
    },
  });
  const html = await email.render(htmlFile, data);
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
    html: html,
    attachments: request.attachments
  });
}

