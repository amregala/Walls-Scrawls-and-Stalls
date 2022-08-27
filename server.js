const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const { render } = require("ejs");

// MODELS
const Wall = require("./models/walls.js");

// SETUP MONGOOSE//DEPENDENCIES
const mongoose = require("mongoose");
// Importing Model
// const Wall = require("./models/walls.js");
// console.log(Wall);
//Config
const mongoURI = "mongodb://localhost:27017/walls";
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI, () => {
  console.log("The connection with mongod is established");
});

//MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

const manyWalls = [
  {
    year: 2010,
    location: "New York, New York",
    artist: "Barry McGee",
  },
  {
    year: 2019,
    location: "Bogota, Colombia",
    artist: "Guache",
  },
  {
    year: 1985,
    location: "Amsterdam, Netherlands",
    artist: "Delta (Boris Tellegen)",
  },
  {
    year: 1980,
    location: "New York, New York",
    artist: "Keith Haring",
  },
];

// Wall.create(testWall, (err, wall) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(wall);
//   }
//   db.close();
// });

Wall.insertMany(manyWalls, (error, walls) => {
  if (error) {
    console.log(error);
  } else {
    console.log(walls);
  }
  // db.close();
});

//DEFAULT
// app.get("/", (req, res) => {
//   res.send("Walls, Scrawls and Stalls in Progress");
// });

// app.get("/walls", (req, res) => {
//   res.send(walls);
// });

// HOME ROUTE
app.get("/wss-home", (req, res) => {
  res.render("home.ejs");
});

//INDEX ROUTE
app.get("/walls", (req, res) => {
  Wall.find({}, (error, walls) => {
    res.render("index.ejs", { walls });
  });
});

// SHOW

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

// HOME ROUTE
// app.get("/walls", (req

// DESTROY

// EDIT

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
