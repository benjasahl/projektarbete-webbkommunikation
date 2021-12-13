//rooturl for our server
const rootURL = "http://localhost:5000/api/";

let mails = [];

/*
function to show responsemessage, the setTimeout function then removes
 the message after 2 seconds  */
const showResponseMessage = (message) => {
  document.querySelector("#response-message").innerHTML = message;
  setTimeout(() => {
    document.querySelector("#response-message").innerHTML = "";
  }, 2000);
};

/* an async function that has four variables (email, name etc) which gathers the
values from the inputfields
 */
const newMail = async () => {
  const firstname = document.querySelector("#contact-firstname").value;
  const email = document.querySelector("#contact-email").value;
  const title = document.querySelector("#contact-title").value;
  const content = document.querySelector("#contact-content").value;
  document.getElementById("msg-confirmation").style.display = "flex";
  /* creates a mail object with two properties which holds the values from the newMail function */
  const mail = {
    firstname,
    email,
    title,
    content,
  };
  /*Calls the fetch function And starts a request to Our url.
 We turn our mail object into json string and send it to the server. 
When the request is completed, the promise is resolved with the response object.
If the request fails the promise is rejected*/
  const res = await fetch(`${rootURL}newmail`, {
    method: "post",
    body: JSON.stringify(mail),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);

  setTimeout(() => {
    document.getElementById(
      "msg-confirmation"
    ).innerHTML = `<p id="response-message"></p>`;
    showResponseMessage(data.message.msgBody);
    
  }, 2000);

  document.getElementById(
    "msg-confirmation"
  ).innerHTML = `<span id="loader"></span>`;

  // empty the inputboxes after sending an email

  document.querySelector("#contact-title").value = "";
  document.querySelector("#contact-content").value = "";
  document.querySelector("#contact-email").value = "";
  document.querySelector("#contact-firstname").value = "";
};
