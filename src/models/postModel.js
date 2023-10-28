const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userCollection',
        required: true,
    },
    Title: {
        type: String,
        required: true,
    }
    ,
    Content: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('postCollection', postSchema);




// 1. User Table:
//  UserID
//  Username
//  Email
//  Password (hashed and salted)
//  Profile information


