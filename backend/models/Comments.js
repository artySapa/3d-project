const { Schema } = require('mongoose')

mongoose = require('mongoose')

const Comment = new Schema({
    id: {
        type: Number,
    },
    file: {
        type: Buffer,
    },
    user: {
        type: String,
    }
})

const Comments = mongoose.model('Comments', Comment);

module.exports = Comments;