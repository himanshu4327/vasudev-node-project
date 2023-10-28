const User = require('../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

exports.CreateUser = async (req, res) => {
    try {
        const { username, Email, Password, Profile_information } = req.body;

        if (!username || !Email || !Password) {
            return res.status(400).json({ status: false, message: "Please enter all fields" });
        }

        const check_user = await User.findOne({ username });

        if (check_user) {
            return res.status(400).json({ status: false, message: 'Username already exists' });
        }

        const check_email = await User.findOne({ Email });
        if (check_email) {
            return res.status(400).json({ status: false, message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new User({
            username,
            Email,
            Password: hashedPassword,
            Profile_information
        });

        await newUser.save();

        return res.status(201).json({ status: true, message: "User account created" });

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}

exports.login = async (req,res) => {
    try{
        const { Email, Password } = req.body;
        if(!Email || !Password){
            return res.status(400).json({status : false ,message : "please provide email and password"})
        }
        let user = await User.findOne({Email});
        console.log(user._id)
        if(!user){
            return res.status(400).json({status : false ,message : "Invalid credentials"})
            }
            const validPass = await bcrypt.compare(Password, user.Password);
            if(!validPass){
                return res.status(400).json({status : false ,message : "Invalid password"})
                }

                
                const token = jwt.sign(
                    {
                        user_id: user._id,
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: '24h',
                    }
                );
                return res.status(200).json({status:true,message:'you are logged in', token:token})

    }catch(error){
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}