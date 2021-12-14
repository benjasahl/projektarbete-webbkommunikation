const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./api/API");
const path = require("path");

//The cors-function allows the browser/server to load external resources.
app.use(cors());

//Here express-function is converted to json.
app.use(express.json());

//This matches a request to a specific route????
app.use("/api", router);

//Here the path of the current directory merges with the path to the client directory.
app.use(express.static(path.join(__dirname, "client")));

//This targets the server port which is declared in the .env-file
const PORT = process.env.PORT;

/*The listen-function checks the connection to the server port
and logs a message stating which port the server is running on.*/
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));


/* A connection is made to the MongoDB-uri, which gets logged in the
console.
 */
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log("Connected to db")
);
