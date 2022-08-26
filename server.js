const express = require("express");
const app = express();
const port = 3000;
const walls = require("./models/walls.js");

//MIDDLEWARE
app.use(express.static("public"));
app.use("/images", express.static(__dirname + "images"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Walls, Scrawls and Stalls in Progress");
// });

// app.get("/walls", (req, res) => {
//   res.send(walls);
// });

//INDEX ROUTE
app.get("/walls", (req, res) => {
  res.render("index.ejs", {
    walls: walls,
  });
});

// // NEW ROUTE
// app.get("/walls/new", (req, res) => {
//     res.render("new.ejs");
//   });

//   // SHOW ROUTE
//   app.get("/walls/:id", (req, res) => {
//     res.render("show.ejs", {
//       walls: walls[req.params.id],
//     });
//   });

//   // NEW CREATE ROUTE
//   app.post("/walls", (req, res) => {
//     // console.log(req.body);
//     walls.push(req.body);
//     res.redirect("/walls");
//   });

//   // DELETE ROUTE
//   app.delete("/walls/:id", (req, res) => {
//     walls.splice(req.params.id, 1);
//     res.redirect("/walls");
//   });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
