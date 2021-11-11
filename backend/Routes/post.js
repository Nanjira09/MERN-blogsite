const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../Models/post");

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    username: req.body.username,
    photoUrl: req.body.photoUrl,
    description: req.body.description,
  });
  await post.save((err, data) => {
    if (err) return res.json({ message: err.message });
    res.json(data);
  });
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.json(post);
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
  const post = await Post.findOne({ _id: req.params.id });
  if (req.user.username === post.username) {
    try {
      await Post.findOneAndDelete({ _id: req.params.id });
      res.json("Post successfully deleted");
    } catch (error) {
      res.json({ message: error.message });
    }
  } else {
    res.json({ message: "You are not allowed!" });
  }
});

router.patch("/:id", verify, async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (req.user.username === post.username) {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          username: req.body.username,
          photoUrl: req.body.photoUrl,
          description: req.body.description,
        }
      );
      res.json("Post Updated");
    } catch (error) {
      res.json({ message: error.message });
    }
  } else {
    res.json({ message: "You are not allowed!" });
  }
});

module.exports = router;
