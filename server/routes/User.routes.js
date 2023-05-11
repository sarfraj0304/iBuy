const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const UserRouter = Router();

UserRouter.get("/", async (req, res) => {
  try {
    const allusers = await UserModel.find();
    res.send(allusers);
  } catch (error) {
    res.send({ err: error });
  }
});

// getting days when account created

UserRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allusers = await UserModel.findOne({ _id: id });
    const createdDate = new Date(allusers.time);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    res.send({ allusers, days });
  } catch (error) {
    res.send({ err: error });
  }
});

UserRouter.post("/register", async (req, res) => {
  try {
    const addUser = new UserModel({ ...req.body, time: Date.now() });
    await addUser.save();
    res.send({ msg: "user registered" });
  } catch (error) {
    if (error.code == 11000) {
      res.send({ err: "user already exists" });
    } else {
      res.send({ err: error });
    }
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const existUser = await UserModel.findOne({ email: req.body.email });
    if (existUser) {
      if (
        existUser.email === req.body.email &&
        existUser.password === req.body.password
      ) {
        var token = jwt.sign({ userID: existUser._id }, "sarfraj");
        res.send({ msg: "user logged in ", token: token });
      } else {
        res.send({ msg: "invalid credentials" });
      }
    } else {
      res.send({ msg: "user not found" });
    }
  } catch (error) {
    res.send({ err: error });
  }
});

module.exports = {
  UserRouter,
};
