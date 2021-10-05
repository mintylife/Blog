const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// create smth? -> post
// updating smth?-> put

// Update
router.put("/:id", async (req, res) => {
  // this is not very safe
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(401).json("You can only update  your account!");
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  // this is not very safe
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User and their posts have been deleted");
      } catch (err) {
        res.status(500).json(err.message);
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(401).json("You can only delete your account!");
  }
});

module.exports = router;
