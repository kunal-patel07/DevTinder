const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfile, validatePassword } = require("../utils/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("user not found");
    }
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(404).send("Error : " + err.message);
  }
});

profileRouter.post("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfile(req)) {
      throw new Error("cannot update this fields");
    }

    const loggedInUser = req.user;

 
    Object.keys(req.body).forEach(
      (fields) => (loggedInUser[fields] = req.body[fields]),
    );

    await loggedInUser.save();

    res.json({
      message: "profile updated successfully",
      updatedProfile: { loggedInUser },
    });
  } catch (e) {
    res.status(404).send("ERROR : " + e.message);
  }
});

profileRouter.patch("/profile/forgotpassword", userAuth ,async (req,res)=>{

  try {
   const  {existingPassword , newPassword} = req.body;
   const user = req.user;

   if(newPassword == "" || existingPassword == ""){
    throw new Error ("password is empty");
   }
 
   const isExistingPassword= await bcrypt.compare(existingPassword,user.password);

   if(!isExistingPassword) {
    throw new Error ("please enter valid existing password");
   }


   const encryptNewPass = await bcrypt.hash(newPassword , 12);

   user.password  = encryptNewPass;

  await user.save()

  res.send("new password saved successfully");
  }catch(e) { 
    res.status(401).send("ERROR: "+ e.message);
  }

})



module.exports = profileRouter;
