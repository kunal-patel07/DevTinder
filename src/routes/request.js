const express = require("express");
const{ userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest" , userAuth,(req,res) => {
    

  try {
    const user  = req.user;
   
    if(!user) { 
      throw new Error ("user not found");
    }
 
   res.send(user.firstName + " is Sent you connection request");     
  }catch (err) { 
    res.status(400).send("Error : ");
  }
})
module.exports = requestRouter;