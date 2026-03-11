const express = require("express");
const app = express();
const port = 3000;
const connectDb = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Michael",
    lastName: "Phelps",
    emailId: "michel@phelps.com",
    password: "mp@swim",
  });
  try {
    await user.save();
    res.send("user data saved successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err);
  }
});

connectDb()
  .then(() => {
    console.log("database connected successfully");

    app.listen(port, () => {
      console.log(`server is running on ${port} `);
    });
  })
  .catch((err) => {
    console.log("error in connection", err.message);
  });
