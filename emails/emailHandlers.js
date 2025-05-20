const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const { createWelcomeEmailTemplate } = require("./emailTemplates");
dotenv.config();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to platEase",
      html: createWelcomeEmailTemplate(name),
      category: "welcome",
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
module.exports = { sendWelcomeEmail };