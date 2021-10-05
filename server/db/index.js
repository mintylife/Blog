const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Hello, I conntected to MongoDB!"))
  .catch((err) => {
    console.error("Connection error!", err.message);
  });

const db = mongoose.connection;

module.exports = db;
