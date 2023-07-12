const jwt = require("jsonwebtoken");
// const path = require("path");
// require("dotenv").config({
//   path: path.resolve(__dirname, "./config.env"),
// });

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      "asdhashdakjshdasjasdbjasduhehjasjdsja",
      async (err, payload) => {
        try {
          if (err) {
            return res.status(401).json({ error: "Unauthorized." });
          }
          console.log("Payload id: ", payload._id);
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
                  _id: { $oid: payload._id },
                },
              }),
            }
          );

          const data = await response.json();
          const doesUserExists = data.document;
          req.user = doesUserExists;
          next();
        } catch (error) {
          console.log(error);
        }
      }
    );
  } else return res.status(403).json({ error: "Forbidden" });
};
