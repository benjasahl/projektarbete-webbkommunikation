//api root
const rootURL = "http://localhost:5000/api/";

let posts = [];

/*const movieTitle = [
  { title: "The Hobbit: An Unexpected Journey" },
  { title: "The Hobbit: The Desolation of Smaug" },
  { title: "The Hobbit: The Battle of the Five Armies" },
  { title: "The Lord of the Rings: The Fellowship of the Ring" },
  { title: "The Lord of the Rings: The Two Towers" },
  { title: "The Lord of the Rings: The Return of the King" },
];

const movies = document.getElementById("movie");*/

const getPosts = async () => {
  //Res holds results from fetch-request
  const res = await fetch(`${rootURL}getposts`);
  //Data turns result into json
  const data = await res.json();
  posts = data.posts;
  /*  The data is the input from the user which we get from the database.
  When the data is returned we map over the posts and render the title and content in the posts-div. 
  */
  document.querySelector("#posts").innerHTML = posts
    .map(
      (post) => `
    <div id="posts-container">
        <h2 id="'${post._id}'-title">${post.title}</h2>

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

 /*const getTitle = () => {
  for (let i = 0; i < movies.length; i++) {
    movies[i].addEventListener("click", () => {
      document.getElementById("title-header").innerHTML = movieTitle[i];
      console.log(movieTitle[i]);
    });
  }
};*/

/* An async function that has two variables (email, name etc) which gathers the
values from the inputfields.
 */
const newPost = async () => {
  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#post-content").value;
  /* Creates a post object with two properties which holds the values from the newPost function */
  const post = {
    title,
    content,
  };
  /*Calls the fetch function and starts a request to our url.
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
  // Empty the inputboxes after posting the post
  document.querySelector("#post-title").value = "";
  document.querySelector("#post-content").value = "";
};

/* Find the specific post by using the id and update title and content*/
const updatePost = async (id) => {
  const title = document.getElementById(`update-post-'${id}'-title`).value;
  const content = document.getElementById(`update-post-'${id}'-content`).value;
  /*Creates a posts object with two properties which holds the values from the newMail function 
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

/*Fetch sends the delete request with the id from the specific item as a parameter,  
and the deletebutton from the getpostfunction calls this function.    */
const deletePost = async (id) => {
  const res = await fetch(`${rootURL}deletepost/${id}`, {
    method: "delete",
  });
  const data = await res.json();
  getPosts();
};

window.addEventListener("load", getPosts);

/*window.addEventListener("load", () => {
  getTitle();
});
*/