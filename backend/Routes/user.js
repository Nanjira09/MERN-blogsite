const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      userProfile: req.body.userProfile,
    });
    await user.save();
    res.status(200).json("Registered successfully!");
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.json({ message: "Wrong credentials" });
    // (await bcrypt.compare(req.body.password, user.password))
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      "nanjira9076"
    );
    user.password == req.body.password
      ? res.json({
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          userProfile: user.userProfile,
          token,
        })
      : res.json({ message: "Wrong credentials" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.auth;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "nanjira9076", (err, user) => {
      err && res.json({ message: "Invalid Token" });
      req.user = user;
      next();
    });
  } else {
    res.json({ message: "You are not authenticated!" });
  }
};

router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findOneAndDelete({ _id: req.params.id });
      res.json("User Deleted successfully");
    } catch (error) {
      res.json({ message: error.message });
    }
  } else {
    res.json({ message: "You are not allowed!" });
  }
});

router.patch("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      // const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          email: req.body.email,
          password: req.body.password,
          userProfile: req.body.userProfile,
        },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      res.json({ message: error.message });
    }
  } else {
    res.json({ message: "You are not allowed!" });
  }
});

module.exports = router;
