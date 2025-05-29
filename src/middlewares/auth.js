const authAdmin = (req, res, next) => {
  const token = "compsec";
  const isAdiminTrue = token === "compsec";
  if (!isAdiminTrue) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
};

const authUser = (req, res, next) => {
  const token = "compsec";
  const isAdiminTrue = token === "compsec";
  if (!isAdiminTrue) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
};

module.exports = { authAdmin, authUser };
