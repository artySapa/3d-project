const { Schema } = require('mongoose')

mongoose = require('mongoose')

const Comment = new Schema({
    id: {
        type: Number, // post that contains all the comments
    },
    postId: {
        type: String,
    },
    file: {
        type: String,
    },
    user: {
        type: String,
    },
    comment: { 
        type: String,
    }
})

const Comments = mongoose.model('Comments', Comment);

module.exports = Comments;