const express = require("express");
const { dbConn } = require("./config/database");
const {User} = require("./models/user")


const app = express();
const port = 3000;

app.post("/signup", async (req,res)=>{
  const user  =new User ({
    firstName:"vishal",
    lastName : "chaudhary",
    emailId : "vc@gmail.com",
    pass:"vcqw12",
    age:20
  })
  try {
    await user.save()
    res.send("user saved to database")
  } catch (error) {
     res.status(400).send("bad request"+ error)    
  }
})


dbConn().then(()=>{
  console.log("connected to database successfully")
  app.listen(port,()=>{
    console.log("server is running on port",port)
   }) 
}).catch(()=>{
  console.log("error connected to database")
})