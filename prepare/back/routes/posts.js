const express = require('express')
const { Post, User, Image, Comment } = require('../models')
const router = express.Router();

// 게시글 불러오기
// post를 10개 불러와서 보내줌
router.get('/', async (req, res, next) => { //GET /posts
    try {
        const posts = await Post.findAll({
            limit : 10,
            order : [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ],
            include : [
                { model : User, attributes : ["id", "nickname"] }, // 게시글 작성자
                { model : Image },
                { model : Comment, include : [
                    { model : User, attributes : [ "id", "nickname" ] } // 코멘트 작성자
                ] }, 
                { model : User, as: "Liker", attributes : ['id'] }, // 좋아요 누른 사람
            ]
        });
        res.status(200).json(posts)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router;