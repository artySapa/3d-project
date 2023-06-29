const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreeSchema = new Schema ({
    content: {
        type: String,
        required: true,
    },
    rank: {
        type: String,
    },
    timestamp:{
        type: Number,
    },
})

const ThreeEntry = mongoose.model("ThreeEntry", ThreeSchema);

module.exports = ThreeEntry;