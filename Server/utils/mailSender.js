const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      // secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = transporter.sendMail({
      from: `StudyNotion -by Avinash Sirohi`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("Email Info =>", info);
    return info;
  } catch (error) {
    console.log("Error in Sending mail =>", error, message);
  }
};
