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

//MULTER MIDDLEWARE
// const multer = require("multer");
// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = { storage: fileStorageEngine };

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, index.html));
// });

// app.post("/single", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.send("Single File Upload Success");
// });

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

// app.get("/walls", (req, res) => {
//   res.send(walls);
// });

// SEED ROUTE
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
