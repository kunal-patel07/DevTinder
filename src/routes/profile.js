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

    console.log(loggedInUser);

    Object.keys(req.body).forEach(
      (fields) => (loggedInUser[fields] = req.body[fields]),
    );

    console.log(loggedInUser);

    await loggedInUser.save();

    res.json({
      message: "profile updated successfully",
      updatedProfile: { loggedInUser },
    });
  } catch (e) {
    res.status(404).send("ERROR : " + e.message);
  }
});

profileRouter.patch("/profile/forgotpassword", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const { existingPassword, newPassword } = req.body;

    if (!existingPassword || !newPassword) {
      throw new Error("both field are required");
    }

    const IsPasswordValid = await bcrypt.compare(
      existingPassword,
      loggedInUser.password,
    );

    if (!IsPasswordValid) {
      throw new Error("password is not valid");
    }

    if (!validatePassword) {
      throw new Error("new password is not strong");
    }

    const encryptedNewPassword = await bcrypt.hash(newPassword, 10);

    loggedInUser.password = encryptedNewPassword;

    loggedInUser.save();

    res.send("password updated");
  } catch (e) {
    res.status(404).send("ERROR: " + e.message);
  }
});

module.exports = profileRouter;
