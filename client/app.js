//api root
const rootURL = "http://localhost:5000/api/";

let mails = [];

//response message
const showResponseMessage = (message) => {
  document.querySelector("#response-message").innerHTML = message;
  setTimeout(() => {
    document.querySelector("#response-message").innerHTML = "";
  }, 2000);
};

//new mail
const newMail = async () => {
  const firstname = document.querySelector("#contact-firstname").value;
  const email = document.querySelector("#contact-email").value;
  const title = document.querySelector("#contact-title").value;
  const content = document.querySelector("#contact-content").value;

  const mail = {
    firstname,
    email,
    title, 
    content,
  };

  const res = await fetch(`${rootURL}newmail`, {
    method: "post",
    body: JSON.stringify(mail),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  showResponseMessage(data.message.msgBody);

  document.querySelector("#contact-title").value = "";
  document.querySelector("#contact-content").value = "";
  document.querySelector("#contact-email").value = "";
  document.querySelector("#contact-firstname").value = "";
};

