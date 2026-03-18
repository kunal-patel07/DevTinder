const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  // we don't want to genrate jwt so we don't need to genrate jwt token

  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("invalid crendential");
    }

    const decodeObj = jwt.verify(token, "fdms");

    const { _id } = decodeObj;
     const user = await User.findById(_id);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};



module.exports = { userAuth };
