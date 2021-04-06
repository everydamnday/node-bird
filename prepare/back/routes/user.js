const express = require("express");
const { User, Post } = require("../models") // 변수 db에 모델들을 다 할당했음 이를 구조분해할당
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const {isLoggedIn, isLoggedOut} = require("./middleware")

// /user 라우터
// 회원가입 - POST: /user   (C)
// 로그 인 - POST: /user/login  (R)
// 로그아웃 - POST: /user/logout
// 팔로우
// 언팔로우
// 닉네임변경   (U)
// + 회원탈퇴(D)
// 로그인한 사용자 가져오기

// 로그인한 사용자 가져오기
// req.user가 있으면 유저정보를 보내고, 아니면 null을 보낸다.
router.get('/', async (req, res) => { // GET /user
    try {
        if(req.user){
        const user = await User.findOne({
                where : { id : req.user.id },
                attributes : { exclude : [ "password" ] },
                include : [
                    { model : Post, attributes : ["id"] },
                    { model : User, as : "Followers", attributes : ["id"]},
                    { model : User, as : "Followings", attributes : ["id"]}
                ]
            })
            return res.status(200).json(user)
        } else {
            console.log(req.user)
            return res.status(200).json(null)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})


// 회원가입 //POST: /user
// 기존 사용자 조회 => 비밀번호 암호화 => 유저테이블 생성 => 완료 응답
router.post("/", async (req, res, next) => { 
    const {email, nickname, password} = req.body
    try {
        // 등록된 사용자인지 조회
        const exUser = await User.findOne({ where : { email } })
        if (exUser){
            return res.status(403).send("이미 사용중인 유저입니다")
        } 
        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10)       // 비밀번호 암호화, 암호화 정도 10~15.  
        await User.create({email, nickname, password : hashedPassword})         // 유저 테이블 생성
        return res.status(201).send('ok')                                   // ok 응답
    } catch (error) {
        console.error(error)
        next(error); // status 500
    }
})

// 로그인 //POST: /user/login
// 패스포트 인증 => 서버 및 사용자 에러 로직 => 패스포트 로그인 => json 유저정보 응답
router.post("/login", isLoggedOut, (req, res, next) => {
    console.log("/login 라우터 접근")
    passport.authenticate("local", (err, user, info) => {   // 로컬전략 성공 후 콜백.
        if(err) {///서버 에러 처리
            console.error(err)
            return next(err)
        }
        if(info) { // 사용자 에러 처리
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginerr) => { // 시리얼라이즈 후 콜백
           if(loginerr) {
            console.error(loginerr)
            return next(loginerr)
           }
           const fullUserWithoutPassword = await User.findOne({ // 관계형 db의 칼럼을 포함한 User 테이블 불러오기
                where : { id : user.id },
                attributes : { 
                    exclude : ["password"]                      // password는 필요없으니 제외하기
                },
                include : [
                    { model : Post, attributes : ["id"] },
                    { model : User, as : "Followers", attributes : ["id"] },
                    { model : User, as : "Followings", attributes : ["id"] }
                ],
           })
           return res.status(200).json(fullUserWithoutPassword)
        })
    })(req, res, next); // 왜 여기만 이게 붙지.
})

// 로그아웃 //POST: /user/logout
// 로그아웃, 세션 데이터 삭제, 성공응답
router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout();               
    req.session.destroy();
    res.status(200).send('ok')
})

//닉네임 변경
// 유저DB 업데이트(내가쓴 모든 게시글의 nickname을 바까라) // 바뀐 닉네임 보내주기
router.patch("/nickname", isLoggedIn, async (req, res, next) => {
    try {
        await User.update(
            { nickname : req.body.nickname }, 
            { where : { id : req.user.id } }
            )
        res.status(200).json({ nickname : req.body.nickname }) //
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// 팔로우
// 게시자를 찾아서, 게시자의 followers에 생성 or 나를 찾아서 나의 followings에 넣기.
router.patch("/follow", isLoggedIn, async (req, res, next) => {
    try {
        // 방법 1 : 나의 팔로잉에 추가하기
        const user = await User.findOne({ where : req.user.id })
        await user.addFollowings(req.body.UserId)// setFollowings도 가능
        //제로초는 req.body.UserId가 존재하는지 체크(게시물을 통해 클릭하므로 노필요)
        res.status(200).json({ UserId : req.body.UserId, nickname : user.nickname})
        
        // 방법 2 : 상대방의 팔로워에 추가하기
        // const user = await User.findOne({ where : req.body.UserId })
        // await user.setFollowers(req.user.id)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

//언팔로우
// 게시자를 찾아서, 게시자의 followers에서 삭제 or 나를 찾아서 나의 followings에서 삭제.
router.patch("/unfollow", isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({where : req.user.id})
        await user.removeFollowers(req.body.UserId)
        res.status(200).json({ UserId : req.body.UserId })
    } catch (error) {
        console.error(error)
        next(error)
    }
})



module.exports = router;