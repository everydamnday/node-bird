const express = require("express");
const { Post, Hashtag, Comment, Image, User } = require("../models");
const { isLoggedIn } = require("./middleware");
const path = require('path');
const fs = require('fs');
const router = express.Router();
const multer = require('multer')

// post 라우터

// 포스트 생성 : POST   - /post/posts
// 포스트 삭제 : Delete - /post
// 코멘트 생성 : POST   - /post/:postId/comment
// 코멘트 삭제 : Delete - /post/:postId/comment
// 좋아요     : PATCH  - /post/:postId/like
// 싫어요     : PATCH  - /post/:postId/unlike
// 이미지업로드 : POST  - /post/images

//업로드 폴더 생성하기
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

// 포스트 생성
// 포스트 생성 후 생성한 포스트 찾아서 보내주기
router.post("/posts", isLoggedIn, async(req, res, next) => {
  try {
    const post = await Post.create({
      content : req.body.content, // { content : text}
      UserId : req.user.id
  })
  const fullPost = await Post.findOne({
    where : { content : req.body.content },
    include : [
      { model : Image },
      { model : Hashtag },
      { model : Comment, include : [
        { model : User, attributes : [ "id", "nickname" ] } // 코멘트 작성자
      ] },
      { model : User, attributes : [ "id", "nickname" ] }, // 게시글 작성자
      { model : User, as: "Liker", attributes : ['id'] }, //  좋아요 누른 사람
    ]
  })
  res.status(200).json(fullPost)
  } catch (error) {
    console.error(error)
    next(error)
  }
});

//코멘트 생성
// 존재하는 포스트인지 검사/ 코멘트 생성 후 생성한 코멘트 보내주기 
router.post("/:postId/comment", isLoggedIn, async(req, res, next) => {
  console.log(req.body)
  const post = await Post.findOne({
    where : { id : req.params.postId}
  })
  if(!post) {
    return res.status(403).send("존재하지 않는 포스트 입니다") // 존재하지 않는 포스트에 댓글을 시도할 때 방지
  }
  try {
    const comment = await Comment.create({
      content : req.body.content,
      PostId : parseInt(req.params.postId, 10), // req.body.postId도 됨. req.params는 문자열이다. 주의하자.
      UserId : req.user.id        // req.body.userId도 됨.
  })

  const fullComment = await Comment.findOne({
    where : { id : comment.id},
    include : [
      { model : User, attributes : [ "id", "nickname" ] },
    ]
  })

  res.status(200).json(fullComment)
  } catch (error) {
    console.error(error)
    next(error)
  }
});

//포스트 삭제
//db에서 해당 id의 게시글 삭제 / 삭제한 게시글의 id 전송
router.delete("/:postId", isLoggedIn, async (req, res) => {
  try {
    await Post.destroy({
      where : { 
        id : parseInt(req.params.postId, 10),
        UserId : req.user.id      // 내가쓴 게시글만 지울 수  있게
      },
    })
    res.status(200).json({ PostId : parseInt(req.params.postId, 10)})
  } catch (error) {
    console.error(error)
    next(error)
  }
});

//게시글 좋아요(관계형DB 메소드)
//DB에서 해당 id의 게시글 찾기 / 게시글 존재 여부 확인/ 게시글에 좋아요 생성 / 좋아요한 post를 다시 전송
router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where : { id : parseInt(req.params.postId, 10)} //params는 문자열
    })
    post ? 
    (await post.addLiker(req.user.id),
    res.status(200).json({ PostId : post.id, UserId : req.user.id}))
    : res.status(400).send("게시글이 존재하지 않습니다")
  } catch (error) {
    console.error(error)
    next(error)
  }
});

// 게시글 싫어요(관계형DB 메소드)
// DB에서 해당 id의 게시글 찾기 / 게시글 존재여부 확인/ 게시글에 좋아요 삭제 / 삭제한 post를 다시 전송
router.patch("/:postId/unlike", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where : { id : parseInt(req.params.postId, 10)} //params는 문자열
    })
    post ? 
    (await post.removeLiker(req.user.id),
    res.status(200).json({ PostId : post.id, UserId : req.user.id}))
    : res.status(400).send("게시글이 존재하지 않습니다")
  } catch (error) {
    console.error(error)
    next(error)
  }
});


// 멀터 미들웨어(이미지 업로드)
const upload = multer({
  storage : multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done){
      const ext = path.extname(file.originalname); // 확장자 추출
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    }
  }),
  limits: { fileSize : 20 * 1024 * 1024},
});

// 이미지 업로드
router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => {
  console.log(req.files, req.files[0].filename)
  res.json(req.files.map(v => v.filename)) // 파일이름 배열 보내주기
})

module.exports = router;
