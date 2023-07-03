const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: "Please enter all the required fields!" });

  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });

  try {
    const reqBody = {
      dataSource: "Cluster0",
      database: "myFirstDatabase",
      collection: "users",
      filter: {
        email: email,
      },
    };
    const response = await fetch(
      "https://data.mongodb-api.com/app/data-hsnwi/endpoint/data/v1/action/findOne",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey:
            process.env.DATA_API_KEY,
        },
        body: JSON.stringify(reqBody),
      }
    );

    const data = await response.json();
    const doesUserExists = data.document;
    // const doesUserExists = await User.findOne({ email });
    if (!doesUserExists)
      return res.status(400).json({ error: "Invalid email or password" });

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExists.password
    );

    if (!doesPasswordMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const payload = { _id: doesUserExists._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = { ...doesUserExists._doc, password: undefined };
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
