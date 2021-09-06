const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//main guard
module.exports.verifyAccount = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = jwt.verify(token, "secretkey");

    User.findOne({ _id: userData.userId })
      .then(function (result) {
        req.user = result;
        next();
      })
      .catch(function (err) {
        res.status(500).json({ error: err, message: "auth failed !" });
      });
  } catch (err) {
    res.status(401).json({ message: "auth failed !" });
  }
};

//guard for admin
module.exports.verifyAdmin = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized User!" });
  } else if (req.user.Usertype !== "Admin") {
    return res.status(401).json({ message: "Unauthorized User!" });
  } else {
    next();
  }
};

//guard for user
module.exports.verifyUser = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized User!" });
  } else if (req.user.Usertype !== "User") {
    return res.status(401).json({ message: "Unauthorized User!" });
  } else {
    next();
  }
};
