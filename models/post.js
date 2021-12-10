
// import the mongoose package  
const mongoose = require("mongoose");

/* 
This creates an instance of a Schema constructor. 
The ”pattern” of the schema is then used to define the schema with two properies, all in string type. 
the boolean required is true and and therefore the user has to input the value for it to work
*/
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});



module.exports = mongoose.model("Post", PostSchema);
