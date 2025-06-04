const express = require("express");
const { dbConn } = require("./config/database");
const { User } = require("./models/user");
const port = 3000;

let app = express();
//kind of middleware
app.use(express.json());

app.get("/user", async (req, res) => {
  const emailFromServer = req.body.emailId;
  try {
    const emailFromDb = await User.find({ emailId: emailFromServer });
    if (!emailFromDb) {
      res.status(404).send("cant find it");
    } else {
      res.send(emailFromDb);
    }
  } catch (error) {
    res.status(404).send("cant find it");
  }
});

app.patch("/usePatch",async(req,res)=>{
  const data = req.body;
  const updateLine=  req.body.mail;

  const updateIt = await User.findOneAndUpdate({emailId:updateLine},data)
  res.send("data updated")
})



app.post("/", async (req, res) => {
  const datafromServer = new User(req.body);
  await datafromServer.save();
  res.send("user registred");
});

app.get("/feed", async (req, res) => {
  const data = await User.find({});
  res.send(data);
});

app.delete("/user", async (req, res) => {
  const userfromServer = req.body.userId;
  console.log(userfromServer);
  try {
    const userDelete = await findByIdAndDelete(userfromServer);
    if (!userDelete) {
      res.status(404).send("user doesn't exist or deleted");
    } else {
      res.send("user deleted successfully");
    }
  } catch (error) {
    res.status(404).send("error deleting user or userid is not exist");
  }
});

app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  try {
    await user.save();
    res.send("user saved to database sucessfully");
  } catch (error) {
    console.log("error storing data");
  }
});

app.post("/userfromServer", async (req, res) => {
  const data = new User(req.body);

  try {
    await data.save();
    res.send("data is saved successfully");
  } catch (error) {
    res.status(401).send("something went wrong");
  }
});

app.get("/findByMail", async (req, res) => {
  const mailFromServer = req.body.firstName;
  try {
    const dataFromDb = await User.findOne({ firstName: mailFromServer });
    res.send(dataFromDb);
  } catch (error) {}
});

// update data using patch method

app.patch("/user", async (req, res) => {
  const userData = req.body.userId;
  const data = req.body;
  try {
    const updatedDb = await User.findByIdAndUpdate({ _id: userData }, data);
    res.send("user updated successfully");
  } catch (error) {
    res.status(401).send("user couldn't update");
  }
});

//update data using email id
app.patch("/userUpdateEmail", async (req, res) => {
  const userMail = req.body.mailId;
  const data = req.body;
  try {
    const mailIdUpadate = await User.findOneAndUpdate(
      { emailId: userMail },
      data
    );
    console.log(mailIdUpadate);
    res.send("user data updated successfully");
  } catch (error) {
    res.status(401).send("user data couldn't updated");
  }
});

dbConn()
  .then(() => {
    console.log("connected to database");
    app.listen(
      port,
      () => {
        console.log("server is running on", port);
      },
      port
    );
  })
  .catch(() => {
    console.log("error in connection");
  });
