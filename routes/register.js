const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
// const path = require("path");
// require("dotenv").config({
//   path: path.resolve(__dirname, "./config.env"),
// });
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
    const response = await fetch(
      "https://data.mongodb-api.com/app/data-hsnwi/endpoint/data/v1/action/findOne",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: process.env.DATA_API_KEY,
        },
        body: JSON.stringify({
          dataSource: "Cluster0",
          database: "myFirstDatabase",
          collection: "users",
          filter: {
            email: email,
          },
        }),
      }
    );
    const data = await response.json();
    const doesUserAlreadyExists = data.document;
    if (doesUserAlreadyExists)
      return res.status(400).json({ error: "User already exists" });

    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = new User({ name, email, password: hashPassword });

    // const result = await newUser.save();
    const savingDoc = await fetch(
      "https://data.mongodb-api.com/app/data-hsnwi/endpoint/data/v1/action/insertOne",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: process.env.DATA_API_KEY,
        },
        body: JSON.stringify({
          dataSource: "Cluster0",
          database: "myFirstDatabase",
          collection: "users",
          document: { name, email, password: hashPassword },
        }),
      }
    );
    const insertedID = await savingDoc.json();
    return res.status(201).json(insertedID.insertedId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
