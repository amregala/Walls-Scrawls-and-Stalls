const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.send("user controller work");
});

module.exports = router;

// localhost:3000/users