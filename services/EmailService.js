const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
require("dotenv").config();

/* The transport function is a standard way of sending emails
and this collects the api-key which is found in the .env-file.
 */
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_KEY,
  })
);

/*
This function is operating the sending of mail. It has a parameter called "mail" which is set in the 
newMail function in api.js. In the console log it will then be stated whether the message was sent or 
if an error occured.
*/
const postAddedEmail = (mail) => {
  transport
    .sendMail({
      from: "Benjamin <yrla.hackzell@hotmail.com>",
      to: `${mail.firstname} <${mail.email}>`,
      subject: "Meddelande mottaget",
      html: `<h1>Ditt meddelande har mottagits</h1>
                <p>Tjohejsan ${mail.firstname}, ditt meddelande (${mail.title}) har mottagits</p>
                <p>Vi återkommer snarast med ett svar!</p>
                <p>Ha en kanonfin dag, ${mail.firstname}!</p>`,
    })
    .then(() => console.log("Meddelande skickat"))
    .catch((err) => console.log(err));
};

exports.postAddedEmail = postAddedEmail;
