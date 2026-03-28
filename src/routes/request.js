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
      const { status, toUserId } = req.params;
      const fromUserId = req.user._id;

      //validate status
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status type" + status);
      }
      //validate toUserId
      const isUserIdExist = await User.findById(toUserId);

      if (!isUserIdExist) {
        throw new Error("user doesn't exist");
      }

      const isConnectionExist = await connectionRequestModel.findOne({
        $or: [
          { toUserId, fromUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });

      if (isConnectionExist) {
        throw new Error("connection request alreay exist");
      }

      const sendConnection = await connectionRequestModel({
        toUserId,
        fromUserId,
        status,
      });

      sendConnection.save();

      console.log(sendConnection);
      res.json({ sendConnection });
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
      const { requestId, status } = req.params;
      const loggedInUser = req.user;
      //validate status
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        throw new Error("invalid status type " + status);
      }

      const acceptConnection = await connectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!acceptConnection) {
        throw new Error("error in connection");
      }

    acceptConnection.status = status;

    const data =await acceptConnection.save();
    res.json({data});

    } catch (e) {
      res.status(400).send("ERROR :" + e.message);
    }
  },
);
module.exports = requestRouter;
