const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`) )

mongoose.connect(
    "mongodb+srv://yrla:hund123@projektuppgift-wk.j2nzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
    () => console.log("Connected to db")
  );
  