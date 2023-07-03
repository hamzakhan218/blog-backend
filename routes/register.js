const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/User");

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Please enter all the details" });

  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (name.length > 15)
    return res
      .status(400)
      .json({ error: "Name can only be less than 25 characters." });

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });

  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long." });

  try {
    // const doesUserAlreadyExists = await User.findOne({ email });

    // if (doesUserAlreadyExists)
    //   return res.status(400).json({ error: "User already exists" });

    // const hashPassword = await bcrypt.hash(req.body.password, 12);
    // const newUser = new User({ name, email, password: hashPassword });

    // const result = await newUser.save();

    // result._doc.password = undefined;

    // return res.status(201).json({ ...result._doc });
    return res.status(200).json("Hello from register");

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
