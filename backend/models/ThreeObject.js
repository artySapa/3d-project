const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreeSchema = new Schema ({
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
    },
    timestamp:{
        type: Number,
    },
    user:{
        type: String,
    },
    id:{
        type: Number
    }
})

const ThreeEntry = mongoose.model("ThreeEntry", ThreeSchema);

module.exports = ThreeEntry;