const express = require("express");
const app = express();
const port = 3000;
const connectDb = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const userEmailId = await req.body.emailId;
    const user = await User.findOne({ emailId: userEmailId });
    if (user == 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("user not found");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    await res.send(users);
  } catch (err) {
    res.status(404).send("users not found");
  }
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
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
