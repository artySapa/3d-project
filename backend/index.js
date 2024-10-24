require('dotenv').config(); // Load environment variables from .env

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcrypt");

const path = require("path");
 // mongodb+srv://artemsapa:resq@cluster0.ghnh3mq.mongodb.net/
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
      fileSize: 20000 * 1024 * 1024, // 20MB
      fieldSize: 20000 * 1024 * 1024,
      offset: 20000 * 1024 * 1024,
    },
  });

const PORT = process.env.PORT || 8080;
const connection = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 50, // Increase to handle more connections
  socketTimeoutMS: 300000, // Set a higher timeout to avoid disconnection
})
  .then(() => console.log("connected to the DB"))
  .catch((error) => {
    console.error("Error connecting to the database: ", error);
  });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: "20mb" }));

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log("Server listening"));

// =============== Three Objects set up =============================
const ThreeEntries = require("./models/ThreeObject");

app.get("/entries", async (req, res) => {
  const allEntries = await ThreeEntries.find({}).lean();
  res.json(allEntries);
});

app.post("/entries/new", upload.single("picture"), async (req, res) => {
  const entries = new ThreeEntries({
    title: req.body.title,
    content: req.body.content,
    rank: req.body.rank,
    user: req.body.user,
    id: req.body.id,
    timestamp: Date.now(),
    picture: req.body.picture,
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
  const entry = await ThreeEntries.findById(req.params._id);

  if(entry.user !== req.body.username){
    return res.status(404).json({error: "This post belongs to someone else!"});
  }

  const deleted = await ThreeEntries.findByIdAndDelete(req.params._id);

  if (!deleted) {
    return res.status(404).json({ error: "Entry not found" });
  }

  res.json(deleted);
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
    // picture: user.picture ? user.picture.toString("base64") : null,
    picture: user.picture,
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

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    picture: req.body.picture,
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
  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    res.json(user);
  } else {
    res.json({ error: "Incorrect password" });
  }
});


// POST COMMENTS
const Comments = require("./models/Comments");

// POST endpoint for handling GLTF file upload
// POST endpoint for handling STL file upload
app.post("/comment/new", upload.single("file"), async (req, res) => {
    try {
      const newComment = new Comments({
        user: req.body.user,
        postId: req.body.postId,
        file: req.body.file, // Save the buffer directly
        comment: req.body.comment,
      });
  
      await newComment.save();
  
      res.json(newComment);
    } catch (error) {
      console.error("Error saving comment:", error);
      res.status(500).json({ error: "Failed to save the comment." });
    }
  });
  
  
  app.get('/single-comment', async (req, res) => {
    const Comments = require("./models/Comments");
    const comment = Comments.findById(req.body.id);
    res.json(comment);
  })

  app.get('/all-comments', async (req, res) => {
    const Comments = require("./models/Comments");
    const allComments = await Comments.find({}).lean();
    res.json(allComments);
  })