const express = require("express");
const { findByIdAndUpdate } = require("../models/users");
const router = express.Router();
const Wall = require("../models/walls");

//MIDDLEWARE
const authRequired = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.send("You must be logged in to do that");
    // res.redirect("user/signin")
  }
};

// ROUTES
// INDEX ROUTE
router.get("/", (req, res) => {
  Wall.find({}, (error, walls) => {
    res.render("index.ejs", { walls });
  });
});

//USER INDEX ROUTE
router.get("/loggedin", (req, res) => {
  Wall.find({}, (error, walls) => {
    res.render("user-index.ejs", { walls });
  });
});

// NEW ROUTE
router.get("/loggedin/new", authRequired, (req, res) => {
  res.render("new.ejs");
});

// CREATE ROUTE
router.post("/", (req, res) => {
  Wall.create(req.body, (error, createdWall) => {
    if (error) {
      console.log("error", error);
      res.send(error);
    } else {
      res.redirect("/walls/loggedin");
    }
  });
});

// SHOW ROUTE
router.get("/:id", (req, res) => {
  Wall.findById(req.params.id, (error, wall) => {
    res.render("show.ejs", { wall });
  });
});

// EDIT ROUTE
router.get("/:id/edit", authRequired, (req, res) => {
  Wall.findById(req.params.id, (error, wall) => {
    res.render("edit.ejs", { wall });
  });
});

// UPDATE ROUTE
router.put("/:id", (req, res) => {
  Wall.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      res.redirect("/walls/loggedin");
    }
  });
});

// DESTROY ROUTE
router.delete("/:id", authRequired, (req, res) => {
  Wall.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect("/walls/loggedin");
  });
});

module.exports = router;
