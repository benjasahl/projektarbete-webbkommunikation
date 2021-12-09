const express = require("express");
const router = express.Router();

/*The two variables "Post" and "Mail" are set to target the two different mongooose-schemas
which are defined in the models-directory.*/
const Post = require("../models/Post");
const Mail = require("../models/Mail");

const { postAddedEmail } = require("../services/EmailService");


/*This router.post method is matched with the /newmail-url. It contains the variable "newMail" 
which sends a new mail by collecting the four properties values that are declared when a user 
fills each input field in contact.html. */ 
router.post("/newmail", (req, res) => {
  console.log(req.body);
  const newMail = new Mail({
    firstname: req.body.firstname,
    email: req.body.email,
    title: req.body.title,
    content: req.body.content,
  });

  /* This function is set to save an error parameter. If an error would occur while sending the 
  mail it will respond with status code 500, and a message is sent stating that an error occured 
  and the boolean msgError will be set to true.
  
  Else the property values (req.body) will be set as a parameter in the postAddedEmail function 
  which is declared in the EmailService.js-file. It will respond with status code 201 and a message 
  is sent stating that the mail was successfully sent, and the boolean msgError is set to false. */
  newMail.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: "An error occured while sending email",
          msgError: true,
        },
      });
    } else {
      postAddedEmail(req.body);
      res.status(201).json({
        message: { msgBody: "Mail successfully sent", msgError: false },
      });
    }
  });
});


/*This router.post method is matched with the /newpost-url. It contains the variable "newPost" which creates 
a newly added post by collecting the two properties values that are declared when a user fills each input 
field in index.html. */ 
router.post("/newpost", (req, res) => {
  console.log(req.body);
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  /* This function is set to save an error parameter. If an error would occur while saving a post 
  it will respond with status code 500, and a message is sent stating that an error occured and 
  the boolean msgError will be set to true.
  
  Else it will respond with status code 201 and a message is sent stating that the post was 
  successfully created, and the boolean msgError is set to false. */
  newPost.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: "An error occured while saving post",
          msgError: true,
        },
      });
    } else {
      res.status(201).json({
        message: { msgBody: "Post successfully created", msgError: false },
      });
    }
  });
});


/*This router.get method is matched with the /getposts url and attempts to find Post documents.
Unless an error occurs it will respond with status code 200, and will add the documents to the posts-property.

If an error occurs while finding the documents it will respond with status code 500, and a message
will be sent stating that an error occured and the msgError boolean will be set to true. */ 
router.get("/getposts", (req, res) => {
  Post.find({}, (err, documents) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "An error occured getting posts",
          msgError: true,
        },
      });
      res.status(200).json({ posts: documents });
    }
  });
});

/* The router.put function is matched with the /updatepost/(specific id) url. When calling the function
it will look through the posts to find the specific post-id, and update it's property values in accordance
to the changed value.

It also contains an if-condition which checks if an error occurs. If error is true it will respond
with a status code 500 followed by a message stating that an error occured, and the boolean msgError 
will be set to true. */
router.put("/updatepost/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, content: req.body.content },
    (err) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: "An error occured updating post",
            msgError: true,
          },
        });

/*Else it will respond with status code 200 and a message is sent stating that the post was 
successfully updated, and the boolean msgError is set to false. */
      } else {
        res.status(200).json({
          message: { msgBody: "Post successfully updated", msgError: false },
        });
      }
    }
  );
});


/* 
The router.delete function is matched with the /deletepost/(specific id) url. When calling the function
it will look after the specific post-id and delete it.

The if-condition checks if an error occurs. If error is true it will respond with a status code 500 
followed by a message stating that an error occured, and the boolean msgError will be set to true.*/

router.delete("/deletepost/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "An error occured deleting post",
          msgError: true,
        },
      });
/*Else it will respond with status code 200 and a message is sent stating that the post was 
successfully deleted, and the boolean msgError is set to false. */
    } else {
      res.status(200).json({
        message: { msgBody: "Post successfully deleted", msgError: false },
      });
    }
  });
});

module.exports = router;
