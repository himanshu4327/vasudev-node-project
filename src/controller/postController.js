const Post = require('../models/postModel')
const User = require('../models/userModel')


exports.CreatePost = async (req, res) => {
    try {
        const { UserID,Title,Content } = req.body;

        if (!UserID || !Title || !Content) {
            return res.status(400).json({ status: false, message: "Please enter all fields" });
        }

        const check_user = await User.findById({ _id:UserID });

        if (!check_user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        UserID,Title,Content
        const newPost = new Post({
            UserID,
            Title,
            Content
        });

        await newPost.save();

        return res.status(201).json({ status: true, message: "Post created" });

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}


exports.GetAllPost = async(req,res) => {
    try{
        const posts = await Post.find().populate({
            path: 'UserID',
            select: ' -__v -createdAt -updatedAt'
        })
        if(!posts){
            return res.status(404).json({ status: false, message: 'Post not found' });
        }
        return res.status(200).json({ status: true, data: posts  });
    }catch(error){
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}




exports.GetAllPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const posts = await Post.findById({ _id: id }).populate({
            path: 'UserID',
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


//  PostID
//  UserID (foreign key referencing User Table)
//  Title
//  Content
//  Timestamp