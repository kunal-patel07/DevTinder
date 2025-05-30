const express = require("express");
const {dbConn}  = require("./config/database")
const {User} = require("./models/user")
const port = 3000;

let app = express()

//kind of middleware
app.use(express.json())
app.post("/signup",async (req,res)=>{

      let user = new User(req.body)
      try {
        await user.save()
        res.send("user saved to database sucessfully")
        
      } catch (error) {
        console.log("error storing data")
      }
})



dbConn().then(()=>{
  console.log("connected to database")
  app.listen(port,()=>{
       console.log("server is running on",port)
  },port)
}).catch(()=>{
  console.log("error in connection`")
})