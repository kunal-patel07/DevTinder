const express = require("express");
const { validateSignUp, validateSignIn } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // validate user
    validateSignUp(req);
    const { firstName, lastName, emailId, password } = req.body;

    // encrypt password
    const encryptPasword = await bcrypt.hash(password, 10);
 
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: encryptPasword,
    });

    await user.save();
    res.send("user data saved successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err);
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    validateSignIn(req);

    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }
  const checkPassword = await user.validatePassword(password);
 
    if (checkPassword){
    
      //genrate token

      const token =await user.getJWT();

     res.cookie("token" , token , { expires : new Date(Date.now() + 900000)});
       res.send("signin successfully")
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err);
  }
});

authRouter.post("/logout",(req,res)=>{
     res.cookie("token" , null , {
      expires : new Date(Date.now())
     })
  res.send("logout successfully")
})

authRouter




module.exports = authRouter;