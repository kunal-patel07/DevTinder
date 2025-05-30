const express = require("express");
const { dbConn } = require("./config/database");
const { User } = require("./models/user");
const port = 3000;

let app = express();

//kind of middleware
app.use(express.json());

app.get("/user",async(req,res)=>{
  const emailfromServer = req.body.emailId;
   try {
    const getEmailfromDb= await User.find({emailId : emailfromServer})
    if(!getEmailfromDb){
      res.status(404).send("something went wrong");
    }else{
      res.send(getEmailfromDb)
    }
   } catch (error) {
          res.status(404).send("something went wrong");
   }
})


app.get("/feed",async(req,res)=>{
  const data = await User.find({})
  res.send(data)
})

app.delete("/user",async(req,res)=>{
  const userfromServer= req.body.userId;
  try {
    const userDelete = await User.findByIdAndDelete(userfromServer)
    res.send("user deleted successfully")
  } catch (error) {
    res.status(404).send("error deleting user")
  }
})


app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  try {
    await user.save();
    res.send("user saved to database sucessfully");
  } catch (error) {
    console.log("error storing data");
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
