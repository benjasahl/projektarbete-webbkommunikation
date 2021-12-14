// import the mongoose package  
const mongoose = require("mongoose");

/* 
This creates an instance of a Schema constructor. 
The ”pattern” of the schema is then used to define the schema with four properies, all in string type. 
The boolean required is true and and therefore the user has to input the value for the function to work
*/
const MailSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

/* 
Creates a model for our schema and exports so files has access to the model. 
The first parameter of the model is the name of the collection that will contain the documents.
The second parameter is the schema  */

module.exports = mongoose.model("Mail", MailSchema);
