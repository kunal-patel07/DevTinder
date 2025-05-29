const authAdmin = (req, res, next) => {
  const token = "xyz";
  const isAdminTrue = token === "xyez";
  if (!isAdminTrue) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
};
module.exports = { authAdmin };
