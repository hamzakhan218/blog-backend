const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
// const path = require("path");
// require("dotenv").config({
//   path: path.resolve(__dirname, "./config.env"),
// });

router.get("/me", auth, (req, res) => {
  return res.status(200).json({ ...req.user });
});

module.exports = router;
