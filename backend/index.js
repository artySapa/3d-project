const { useSelector } = require("react-redux");

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

connection = "mongodb+srv://artemsapa:resq@cluster0.ghnh3mq.mongodb.net/";

mongoose.set("strictQuery", false);

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to the DB"))
  .catch(console.error);

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080, () => console.log("Server listening on port 8080"));

// =============== Three Objects set up =============================
const ThreeEntries = require("./models/ThreeObject");

app.get("/entries", async (req, res) => {
  const allEntries = await ThreeEntries.find({});
  res.json(allEntries);
});

app.post("/entries/new", async (req, res) => {
  const entries = new ThreeEntries({
    title: req.body.title,
    content: req.body.content,
    rank: req.body.rank,
    user: req.body.user,
    id: req.body.id,
    timestamp: Date.now(),
  });
  await entries.save();
  res.json(entries);
});

app.put("/entries/edit/:_id", async (req, res) => {
  const entry = await ThreeEntries.findById(req.params._id);

  entry.content = req.body.content;
  entry.rank = req.body.rank;
  entry.user = req.body.user;
  entry.title = req.body.title;
  entry.id = req.body.id;
  entry.save();
  res.json(entry);
});

app.put("/entries/rank/:_id", async (req, res) => {
  const entry = await ThreeEntries.findById(req.params._id);
  if (!entry) {
    return res.status(404).json({ error: "Entry not found" });
  }


  if(req.body.rank < 0){return;}

  if (entry.rank < req.body.rank) {
    entry.rank = req.body.rank;
    entry.likedUsers.push(req.body.user);
    entry.active = req.body.active;
  } else {
    entry.rank = req.body.rank;
    const index = entry.likedUsers.indexOf(req.body.user);
    if (index > -1) {
      entry.likedUsers.splice(index, 1);
    }
    entry.active = req.body.active;
  }
  await entry.save();

  res.json(entry);
});

app.delete("/entries/delete/:_id", async (req, res) => {
  const entry = await ThreeEntries.findByIdAndDelete(req.params._id);
  if (!entry) {
    return res.status(404).json({ error: "Entry not found" });
  }
  res.json(entry);
});

// USER ENDPOINTS
const User = require("./models/User");

// Get all users
app.get("/users", async (req, res) => {
  const users = await User.find({});

  const usersWithPicture = users.map((user) => ({
    _id: user._id,
    username: user.username,
    password: user.password,
    picture: user.picture ? user.picture.toString("base64") : null,
  }));

  res.json(usersWithPicture);
});

// Create new user
app.post("/users/new", upload.single("picture"), async (req, res) => {
  const dupUser = await User.findOne({ username: req.body.username });
  if (dupUser) {
    res.json({ error: "Duplicate username exists." });
    return;
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    picture: req.file ? req.file.buffer : null,
  });

  await user.save();

  res.json(user);
});

// Delete user
app.delete("/users/delete/:_id", async (req, res) => {
  const result = await User.findByIdAndDelete(req.params._id);

  res.json(result);
});

// Edit user information
app.put("/users/edit/:_id", async (req, res) => {
  const user = await User.findById(req.params._id);

  user.username = req.body.username;
  user.password = req.body.password;
  user.picture = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };
  user.save();

  res.json(user);
});

// Log in user account
app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.json({ error: "That username doesn't exist" });
    return;
  }

  if (user.password === req.body.password) {
    res.json(user);
  } else {
    res.json({ error: "Incorrect password" });
  }
});
