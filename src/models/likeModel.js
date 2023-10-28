const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
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
    like:{
        type : Number ,
        default : 0
    }
}, { timestamps: true });

module.exports = mongoose.model('likeCollection', likeSchema);
