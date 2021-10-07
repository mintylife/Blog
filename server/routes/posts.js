const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// Create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted");
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(401).json("Can't delete someone else's post");
    }
  } catch {
    res.status(401).json("Post is not found");
  }
});

// Update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        // to see updated post
        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      res.status(401).json("Can't update someone else's post");
    }
  } catch {
    res.status(401).json("Post is not found");
  }
});

// Get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const category = req.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (category) {
      posts = await Post.find({ categories: { $in: [category] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
