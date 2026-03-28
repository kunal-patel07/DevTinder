const express = require("express");

const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try{
  const loggedInUser = req.user;

  const findConnections = await connectionRequestModel
    .find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId" , ["firstName", "lastName","photoUrl","skills"]);

    res.json({findConnections})

    }catch(e){
        res.status(400).send("ERROR : "+e.message);
    }
});

module.exports = userRouter;
