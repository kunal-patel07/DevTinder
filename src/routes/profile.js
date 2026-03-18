const express = require("express");
 const{ userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
      const user = req.user;

      if(!user) {
        throw new Error("user not found")
      }
     console.log(user)
     res.send(user);
  } catch (err) {

    res.status(404).send("Error : " + err.message);
  }
});
module.exports = profileRouter;