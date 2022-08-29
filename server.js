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

// MODELS
const Wall = require("./models/walls.js");

// SETUP MONGOOSE//DEPENDENCIES
const mongoose = require("mongoose");
// Importing Model
// const Wall = require("./models/walls.js");
// console.log(Wall);
//Config
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

// CONTROLLERS
const userController = require("./controllers/userController.js");
app.use("/users", userController);

// const manyWalls = [
//   {
//     year: 2010,
//     location: "New York, New York",
//     artist: "Barry McGee",
//   },
//   {
//     year: 2019,
//     location: "Bogota, Colombia",
//     artist: "Guache",
//   },
//   {
//     year: 1985,
//     location: "Amsterdam, Netherlands",
//     artist: "Delta (Boris Tellegen)",
//   },
//   {
//     year: 1980,
//     location: "New York, New York",
//     artist: "Keith Haring",
//   },
// ];

// Wall.create(testWall, (err, wall) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(wall);
//   }
//   db.close();
// });

// Wall.insertMany(manyWalls, (error, walls) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(walls);
//   }
//   db.close();
// });

//DEFAULT
app.get("/", (req, res) => {
  res.send(`<h1>Walls, Scrawls and Stalls App in Progress</h1>`);
});

// app.get("/walls", (req, res) => {
//   res.send(walls);
// });

// HOME ROUTE
app.get("/wss-home", (req, res) => {
  res.render("users/signin.ejs");
});

// ABOUT ROUTE
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

//INDEX ROUTE
app.get("/walls", (req, res) => {
  Wall.find({}, (error, walls) => {
    res.render("index.ejs", { walls });
  });
});

// NEW
app.get("/walls/new", (req, res) => {
  res.render("new.ejs");
});

// SHOW
app.get("/walls/:id", (req, res) => {
  const wall = Wall.findById(req.params.id);
  res.render("show.ejs", { wall });
});

// CREATE
app.post("/walls", (req, res) => {
  Wall.create(req.body, (error, createdWall) => {
    if (error) {
      console.log("error", error);
      res.send(error);
    } else {
      res.send(createdWall);
    }
  });
  res.redirect("/wall");
});

// DESTROY
app.delete("/walls/:id", (req, res) => {
  res.send("deleting item");
});

// EDIT

// UPDATE

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
