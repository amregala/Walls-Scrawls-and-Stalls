const express = require("express");
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('users/register.ejs');
});

module.exports = router;

// localhost:3000/users