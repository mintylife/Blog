const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
  },
  // updated and create at time stamps shortcut
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
