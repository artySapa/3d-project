const { Schema } = require('mongoose')

mongoose = require('mongoose')

const Comment = new Schema({
    id: {
        type: Number, // post that contains all the comments
    },
    postId: {
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