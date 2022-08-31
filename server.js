const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const { render } = require("ejs");
const session = require("express-session");

// ENVIRONMENT VARRIABLES
require("dotenv").config();
const PORT = process.env.PORT;

// SESSIONS
const SESSION_SECRET = process.env.SESSION_SECRET;
console.log("Here is the session secret:");
console.log(SESSION_SECRET);
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Custom MIDDLEWARE
// a local variable on all routes
// app.use((req, res, next) => {
// res.locals.currentUser = req.session.currentUser;
// if (req.session.currentUser {
//       res.locals.autenticated = true;
// }
// next();
// });

// MODELS
const Wall = require("./models/walls.js");
console.log(Wall);

// SETUP MONGOOSE//DEPENDENCIES
const mongoose = require("mongoose");
//Configuration
const mongoURI = process.env.MONGODB_URI;
const db = mongoose.connection;
// Connect to Mongo
mongoose.connect(mongoURI, () => {
  console.log("The connection with mongod is established");
});

//MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// CONTROLLER IMPORTS
const userController = require("./controllers/userController.js");
app.use("/users", userController);

const wallController = require("./controllers/wallController.js");
app.use("/walls", wallController);

// ****** ROUTES *******

//DEFAULT
app.get("/", (req, res) => {
  res.send(`<h1>Walls, Scrawls and Stalls App</h1>`);
});

// HOME ROUTE
app.get("/wss-home", (req, res) => {
  res.render("users/signin.ejs");
});

// ABOUT ROUTE
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
