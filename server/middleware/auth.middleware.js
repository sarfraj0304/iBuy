const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "sarfraj", (err, decode) => {
      if (decode) {
        req.body.userID = decode.userID;
        next();
      } else {
        res.send({ msg: "authentication failed" });
      }
    });
  } catch (error) {
    res.send({ err: error });
  }
};

const BuyerAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "sarfraj", (err, decode) => {
      if (decode) {
        req.body.buyerID = decode.userID;
        next();
      } else {
        res.send({ msg: "authentication failed" });
      }
    });
  } catch (error) {
    res.send({ err: error });
  }
};

const ProfileAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "sarfraj", (err, decode) => {
      if (decode) {
        next();
      } else {
        res.send({ msg: "authentication failed" });
      }
    });
  } catch (error) {
    res.send({ err: error });
  }
};

module.exports = {
  AuthMiddleware,
  BuyerAuthMiddleware,
  ProfileAuthMiddleware,
};
