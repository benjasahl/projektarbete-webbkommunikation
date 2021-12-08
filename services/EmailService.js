const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

//can be used in any custom email function we want to send different types of email
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey:
      "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",
  })
);

/*here we create a function that uses our transport variable to send a 
a certain type of email*/
const postAddedEmail = (post) => {
  transport
    .sendMail({
      from: "Benjamin <bensahlgren@gmail.com>",
      to: `${post.firstname} <${post.email}>`,
      subject: "Message received",
      text: `Hi, your message has been received. We will get back to you soon!`,
      html: `<h1>Your message has been received</h1>
                <p>Hi ${post.firstname}, your message (${post.title}) has been received</p>
                <p>We will get back to you soon!</p>
                <p>Have a great day!</p>`,
    })
    .then(() => console.log("Email sent"))
    .catch((err) => console.log(err));
};

exports.postAddedEmail = postAddedEmail;
