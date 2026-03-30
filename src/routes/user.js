const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

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

  res.json({ data: data });
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequestModel
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromuserId toUserId");

    const hideUserFromFeed = new Set();

    connectionRequests.forEach((request) => {
    hideUserFromFeed.add(request.fromUserId)
    hideUserFromFeed.add(request.toUserId)
    });

    console.log(hideUserFromFeed)
    const user = await User.find({
      $and : [
      {_id : {$nin : Array.from(hideUserFromFeed)}},
      {_id : {$ne : loggedInUser._id}}
      ]
    }).select(["firstName", "lastName", "photoUrl", "skills"])

    res.json(user)
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

module.exports = userRouter;
