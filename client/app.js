//rooturl for our server
const rootURL = "http://localhost:5000/api/";

let mails = [];

/*
Function to set the responsemessage, the setTimeout function then removes
 the message after 2 seconds  */
const showResponseMessage = (message) => {
  document.querySelector("#response-message").innerHTML = message;
  setTimeout(() => {
    document.querySelector("#response-message").innerHTML = "";
    document.getElementById("msg-confirmation").style.display = "none";
  }, 2000);
};

/* An async function that has four variables (email, name etc) which gathers the
values from the inputfields
 */
const newMail = async () => {
  const firstname = document.querySelector("#contact-firstname").value;
  const email = document.querySelector("#contact-email").value;
  const title = document.querySelector("#contact-title").value;
  const content = document.querySelector("#contact-content").value;
  document.getElementById("msg-confirmation").style.display = "flex";
  /* Creates a mail object with four properties which holds the values from the newMail function */
  const mail = {
    firstname,
    email,
    title,
    content,
  };
  /*Calls the fetch function and starts a request to our url.
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

  /*This setTimeout function targets the msg-confirmation div and changes the innerHTML
  from showing the loader to showing the response message after 2 seconds.*/
  setTimeout(() => {
    document.getElementById(
      "msg-confirmation"
    ).innerHTML = `<p id="response-message"></p>`;
    showResponseMessage(data.message.msgBody);
  }, 2000);

  //Resets the innerHTML of the msg-confirmation div to contain the loader.
  document.getElementById(
    "msg-confirmation"
  ).innerHTML = `<span id="loader"></span>`;

  // Empty the inputboxes after sending an email

  document.querySelector("#contact-title").value = "";
  document.querySelector("#contact-content").value = "";
  document.querySelector("#contact-email").value = "";
  document.querySelector("#contact-firstname").value = "";
};
