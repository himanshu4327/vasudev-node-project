const Post = require('../models/postModel')
const User = require('../models/userModel')
const Like = require('../models/likeModel')


exports.CreateLike = async (req, res) => {
    try {
        const { UserID,PostID } = req.body;

        if (!UserID || !PostID) {
            return res.status(400).json({ status: false, message: "Please enter all fields" });
        }

        const check_user = await User.findById({ _id:UserID });

        if (!check_user) {
            return res.status(400).json({ status: false, message: 'User not found' });
        }


        const check_post = await Post.findById({ _id:PostID });

        if (!check_post) {
            return res.status(400).json({ status: false, message: 'Post not found' });
        }

        const newLike = new Like({
            UserID,
            PostID,
            like: 1
        });

        await newLike.save();

        return res.status(201).json({ status: true, message: "Like created" });

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}


exports.GetAllLikedPost = async (req, res) => {
    try {
    
        const posts = await Post.find().populate({
            path: 'UserID',
            select: '-__v -createdAt -updatedAt'
        }).populate({
            path: 'PostID',
            select: '-__v -createdAt -updatedAt'
        });

        if (posts.length === 0) {
            return res.status(404).json({ status: false, message: 'No posts found for the given user ID' });
        }

        return res.status(200).json({ status: true, data: posts });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}
