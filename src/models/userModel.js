const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    }
    ,
    Password: {
        type: String,
        required: true
    },
    Profile_information: String,
}, { timestamps: true });

module.exports = mongoose.model('userCollection', userSchema);




// 1. User Table:
//  UserID
//  Username
//  Email
//  Password (hashed and salted)
//  Profile information


