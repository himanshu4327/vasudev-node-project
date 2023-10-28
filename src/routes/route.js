const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const {CreateUser,login} = require('../controller/userController')
const {CreatePost,GetAllPost,GetAllPostById} = require('../controller/postController')
const{CreateLike,GetAllLikedPost} = require('../controller/likeController')
const {CreateComment} = require('../controller/commentController')

router.post('/register/user', CreateUser)
router.post('/login',login)

router.post('/create-post', CreatePost)
router.get('/all-posts', GetAllPost)

router.get('/posts/by/:id', GetAllPostById)


router.post('/create-like', CreateLike)
router.post('/get/liked/post', GetAllLikedPost)

router.post('/create-comment', CreateComment)


module.exports = router