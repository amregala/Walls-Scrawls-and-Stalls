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
  }
};

// ROUTES
// INDEX ROUTE
router.get("/", (req, res) => {
  Wall.find({}, (error, walls) => {
    res.render("index.ejs", { walls });
  });
});

// NEW ROUTE
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE ROUTE
router.post("/", (req, res) => {
  Wall.create(req.body, (error, createdWall) => {
    if (error) {
      console.log("error", error);
      res.send(error);
    } else {
      res.redirect("/walls");
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
router.get("/:id/edit", (req, res) => {
  Wall.findById(req.params.id, (error, wall) => {
    res.render("edit.ejs", { wall });
  });
});

// UPDATE ROUTE
router.put("/:id", (req, res) => {
  Wall.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      res.redirect("/walls/:id");
    }
  );
});

// DESTROY ROUTE
router.delete("/:id", (req, res) => {
  Wall.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect("/walls");
  });
});

module.exports = router;
