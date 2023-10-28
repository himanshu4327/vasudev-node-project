const Post = require('../models/postModel')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')


exports.CreateComment = async (req, res) => {
    try {
        const { UserID,PostID,Content } = req.body;

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

        const newComment = new Comment({
            UserID,
            PostID,
            Content
        });

        await newComment.save();

        return res.status(201).json({ status: true, message: "comment created" });

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}
