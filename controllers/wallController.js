const express = require("express");
const router = express.Router();
const User = require("../models/walls");

//MIDDLEWARE
const authRequired = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    
    } else {
        res.send ("You must be logged in to do that")
    }
}

