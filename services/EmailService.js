const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
require("dotenv").config();

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_KEY,
  })
);

/*
This function is operating sending of mail. It has a parameter called "mail" which is set in the 
newMail function in api.js. 
*/
const postAddedEmail = (mail) => {
  transport
    .sendMail({
      from: "Benjamin <yrla.hackzell@hotmail.com>",
      to: `${mail.firstname} <${mail.email}>`,
      subject: "Message received",
      text: `Hi, your message has been received. We will get back to you soon!`,
      html: `<h1>Your message has been received</h1>
                <p>Hi ${mail.firstname}, your message (${mail.title}) has been received</p>
                <p>We will get back to you soon!</p>
                <p>Have a great day!</p>`,
    })
    .then(() => console.log("Email sent"))
    .catch((err) => console.log(err));
};

exports.postAddedEmail = postAddedEmail;
