const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

connection = 
"mongodb+srv://artemsapa:resq@cluster0.ghnh3mq.mongodb.net/"

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

app.get('/entries', async (req, res) => {
    const allEntries = await ThreeEntries.find({});
    res.json(allEntries);
})

app.post('/entries/new', async (req,res) => {
    const entries = new ThreeEntries({
        title: req.body.title,
        content: req.body.content,
        rank: req.body.rank,
        user: req.body.user,
        timestamp: Date.now(),
    });
    await entries.save();
    res.json(entries);
})

app.put('/entries/edit/:_id', async (req,res) => {
    const entry = await ThreeEntries.findById(req.body._id);

    entry.content = req.body.content;
    entry.rank = req.body.rank;
    entry.user = req.body.user;
    entry.title = req.body.title;
    entry.save();
    res.json(entry);
})

app.put('/entries/rank/:_id', async (req,res) => {
    const entry = await ThreeEntries.findById(req.body._id);

    entry.rank = req.body.rank;
    entry.save();
    res.json(entry);
})

app.delete('entries/delete', async (req, res) => {
    const entry = await ThreeEntries.findByIdAndDelete(req.body._id);
    res.json(entry);
})

