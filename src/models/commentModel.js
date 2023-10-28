const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userCollection',
        required: true,
    },
    PostID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postCollection',
        required: true,
    },
    Content:{
        type: String,
        required:true,
    }

}, { timestamps: true });

module.exports = mongoose.model('commentCollection', commentSchema);
