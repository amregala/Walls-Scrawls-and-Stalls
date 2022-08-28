const express = require("express");
const bcrypt = require("bcrypt");

//USER MODEL
const User = require("../models/users");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("users/register.ejs");
});

router.post("/register", (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  // console.log(req.body);
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  // console.log(req.body);
  User.findOne({ username: req.body.username }, (err, userExists) => {
    if (userExists) {
      res.send("That username is taken");
    } else {
      User.create(req.body, (err, createdUser) => {
        console.log(createdUser);
        res.send("User created");
      });
    }
  });
});

module.exports = router;

// localhost:3000/users
