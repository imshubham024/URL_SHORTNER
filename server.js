const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// environment variables
dotenv.config();

// initialzie express
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// connecting to the mongoose 

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/urlshortner", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//LISTENING TO PORT

app,
  listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
