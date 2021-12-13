//api root
const rootURL = "http://localhost:5000/api/";

let posts = [];

//get posts
const getPosts = async () => {
  //res holds results from fetch-request
  const res = await fetch(`${rootURL}getposts`);
  //data turns result into json
  const data = await res.json();
  posts = data.posts;
  /*  the data is the input from the user which we get from the database.
  when the data is returned we map over the posts and render the title and content. 
  */  
  document.querySelector("#posts").innerHTML = posts
    .map(
      (post) => `
    <div id="posts-container">
        <h3 id="'${post._id}'-title">${post.title}</h3>

        <p id="'${post._id}'-content">${post.content}</p>

        <form onsubmit="updatePost('${post._id}'); return false">
        <button id="edit-btn">Redigera</button>
        <div class="edit">
        <input id="update-post-'${post._id}'-title"  placeholder="Titel">
        <br>
        <input id="update-post-'${post._id}'-content"  placeholder="Recension">
        <br>

        <button type="submit">Uppdatera</button>
        <button onclick="deletePost('${post._id}')" >Ta bort</button>
        </form></div>
    </div>
    `
    )
    .join("");

  /*const editBtn = document.getElementById("edit-btn");
  const editContent = document.getElementsByClassName("edit");
  for (let i = 0; i < editContent.length; i++) {
    editBtn.addEventListener("click", () => {
      editContent[i].style.display = "flex";
    });
  }*/
};

/* an async function that has two variables (email, name etc) which gathers the
values from the inputfields
 */ 
const newPost = async () => {
  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#post-content").value;
  /* creates a post object with two properties which holds the values from the newPost function */
  const post = {
    title,
    content,
  };
  /*Calls the fetch function And starts a request to Our url.
 We turn our mail object into json string and send it to the server. 
When the request is completed, the promise is resolved with the response object.
If the request fails the promise is rejected*/
  const res = await fetch(`${rootURL}newpost`, {
    method: "post",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  getPosts();
// empty the inputboxes after posting the post
  document.querySelector("#post-title").value = "";
  document.querySelector("#post-content").value = "";
};

/* find the specific post byh using the id and update title and content*/
const updatePost = async (id) => {
  const title = document.getElementById(`update-post-'${id}'-title`).value;
  const content = document.getElementById(`update-post-'${id}'-content`).value;
/*creates a posts object with two properties which holds the values from the newMail function 
if title or content is false ( if one of the inputfield is empty) its the same as before.  */
  const post = {
    title: title ? title : document.getElementById(`'${id}'-title`).innerHTML,
    content: content
      ? content
      : document.getElementById(`'${id}'-content`).innerHTML,
  };

  const res = await fetch(`${rootURL}updatepost/${id}`, {
    method: "put",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  getPosts();
};

/*fetch sends the delete request with the id from the specific item as a parameter 
the deletebutton from the getpostfunction calls this function.    */ 
const deletePost = async (id) => {
  const res = await fetch(`${rootURL}deletepost/${id}`, {
    method: "delete",
  });
  const data = await res.json();
  getPosts();
};

window.addEventListener("load", getPosts);
