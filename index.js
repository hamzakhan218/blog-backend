const express = require("express");
const morgan = require('morgan')
// const path = require("path");
// require("dotenv").config({
//   path: path.resolve(__dirname, "./config.env"),
// });
const home = require("./routes/home");
const login = require("./routes/login");
const register = require("./routes/register");
const connectToDB = require("./db");

const app = express();

app.use(express.json());
app.use(morgan('tiny'))
app.use("/api", home);
app.use("/api", login);
app.use("/api", register);

const port = process.env.PORT || 9001;

app.listen(port, async() => {
    await connectToDB()
  console.log(`Listening to port ${port}`);
});
