const express = require("express");
const app = express();
const port = 3000;
const connectDb = require("./config/database");
const User = require("./models/user");

app.use(express.json());

//update user by email
app.patch("/userss", async (req, res) => {
  const userMail = req.body.emailId;
  const userData = req.body;
  console.log(userMail);
  try {
    const userUpdate = await User.findOneAndUpdate({emailId : userMail},  userData ,{runValidators : true});
    res.send(userUpdate);
  } catch (err) {
    res.status(400).send("bad request");
  }
});

//update user by id
app.patch("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = req.body;



  try {

     //add which fields can be updated 
     const ALLOWWED_UPADTED = ["lastName", "gender", "skills" ];
      //check every line of ALLOWED UPADATE and compare with user if it is included or not 
     const IsUpdated = Object.keys(user).every((k)=> ALLOWWED_UPADTED.includes(k));

     if(!IsUpdated) { 
      throw new Error ("update not allowed");
     }

    const userUpdate = await User.findByIdAndUpdate(userId, user,{runValidators : true});
    res.send("user updated successfully");
  } catch (err) {
    res.status(404).send("Something Went Wrong" + err.message);
  }
});

//delete user by id
app.delete("/users", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: userId });
  } catch (error) {
    res.status(400).send("bad request");
  }
});

//find user by mailId
app.get("/users", async (req, res) => {
  try {
    const userMail = req.body.emailId;
    console.log(userMail);
    const user = await User.find({ emailId: userMail });
    res.send(user);
  } catch (err) {
    res.status(404).send("user not found");
  }
});
//get all users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("users not found");
  }
});

//add new user to database
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
