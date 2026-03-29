const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const findConnections = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName", "photoUrl", "skills"]);

    res.json({ findConnections });
  } catch (e) {
    res.status(400).send("ERROR : " + e.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  const connectionRequest = await connectionRequestModel
    .find({
      $and: [
        { status: "accepted" },
        {
          $or: [
            { fromUserId: loggedInUser._id },
            { toUserId: loggedInUser._id },
          ],
        },
      ],
    })
    .populate("fromUserId", ["firstName", "lastName", "photoUrl", "skills"])
    .populate("toUserId", ["firstName", "lastName", "photoUrl", "skills"]);
  const data = connectionRequest.map((field) => {
    if (field.fromUserId._id.toString() === loggedInUser._id.toString()) {
      return field.toUserId;
    } else {
      return field.fromUserId;
    }
  });

  res.json({data:data});
});



module.exports = userRouter;
