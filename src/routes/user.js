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

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // user should not see this all card
    // his own card
    // his connection
    // ignored people
    // already sent the connection request

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit  = limit > 50  ? 50 : limit;
    
    const skip = (page - 1) * limit;

    const loggedInUser = await req.user;

    const connectionRequests = await connectionRequestModel
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId);
      hideUsersFromFeed.add(req.toUserId);
    });

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName photoUrl skills")
      .skip(skip)
      .limit(limit); 

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});




module.exports = userRouter;
