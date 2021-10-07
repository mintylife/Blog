const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const apiPort = 3000;
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");

const postsRoute = require("./routes/posts");

dotenv.config();
app.use(express.json());

const db = require("./db");

// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use("/server/auth", authRoute);
app.use("/server/users", usersRoute);
app.use("/server/posts", postsRoute);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
