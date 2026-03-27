const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid Status type  " + status);
      }
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User not exist");
      }

      //this will ensure that you can't send request again
      const isConnectionRequestExist = await connectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isConnectionRequestExist) {
        return res.status(400).send("cannot send request again");
      }

      const requestData = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await requestData.save();
      res.json({ data });
    } catch (err) {
      res.status(400).send("Error : " + err);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const {status,requestId} = req.params;

       const allowedStatus = ["accepted" , "rejected"];

       if(!allowedStatus.includes(status)){
        throw new Error("invalid status type :" + status);
       }
       const connectionRequest  = await connectionRequestModel.findOne({
        _id : requestId,
        toUserId : loggedInUser._id,
        status: "interested"
       })


       if(!connectionRequest){
        throw new Error("invalid connection request");
       }
        

         connectionRequest.status = status;
       const data = await connectionRequest.save();
       res.json({data});



    } catch (e) {
      res.status(400).send("ERROR :" + e.message);
    }
  },
);
module.exports = requestRouter;
