const express = require("express");
const router = express.Router();

/*The two variables "Post" and "Mail" are set to target the two different mongooose-schemas
which are defined in the models-directory.*/
const Post = require("../models/Post");
const Mail = require("../models/Mail");

const { postAddedEmail } = require("../services/EmailService");

/*This router.post method is matched with the /newmail-url. It contains the variable "newMail" 
which sends a new mail by collecting the four property values that are declared when a user 
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
      res.status(500).json({
        message: {
          msgBody:
            "Ett fel inträffade när meddelandet skulle skickas! Tänk på att ange en korrekt epost-adress!",
          msgError: true,
        },
      });
    } else {
      postAddedEmail(req.body);
      res.status(201).json({
        message: { msgBody: "Meddelandet har skickats!", msgError: false },
      });
    }
  });
});



/*This router.post method is matched with the /newpost-url. It contains the variable "newPost" which creates 
a newly added post by collecting the two properties values that are declared when a user fills each input 
field in index.html. */
router.post("/newpost", (req, res) => {
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
      res.status(500).json({
        message: {
          msgBody:
            "Ett fel inträffade när ett inlägg skulle skapas, tänk på att fylla i både titel och innehåll.",
          msgError: true,
        },
      });
    } else {
      res.status(201).json({
        message: { msgBody: "Inlägget har skapats!", msgError: false },
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
          msgBody: "Ett fel inträffade när inlägget skulle hämtas.",
          msgError: true,
        },
      });
    } else {res.status(200).json({ posts: documents }); 
    }
  });
});

/* The router.put function is matched with the /updatepost/(specific post-id) url. When calling the function
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
            msgBody: "Ett fel inträffade när inlägget skulle uppdateras.",
            msgError: true,
          },
        });

        /*Else it will respond with status code 200 and a message is sent stating that the post was 
successfully updated, and the boolean msgError is set to false. */
      } else {
        res.status(200).json({
          message: { msgBody: "Inlägget har uppdaterats!", msgError: false },
        });
      }
    }
  );
});

/* 
The router.delete function is matched with the /deletepost/(specific post-id) url. When calling the function
it will look after the specific post-id and delete it.

The if-condition checks if an error occurs. If error is true it will respond with a status code 500 
followed by a message stating that an error occured, and the boolean msgError will be set to true.*/

router.delete("/deletepost/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Ett fel inträffade när inlägget skulle raderas.",
          msgError: true,
        },
      });
      /*Else it will respond with status code 200 and a message is sent stating that the post was 
successfully deleted, and the boolean msgError is set to false. */
    } else {
      res.status(200).json({
        message: { msgBody: "Inlägget har raderats!", msgError: false },
      });
    }
  });
});

module.exports = router;
