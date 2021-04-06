const passport = require("passport")
const { Strategy : LocalStrategy } = require("passport-local")
const bcrypt = require('bcrypt')
const { User } = require("../models")

//로컬전략 모듈
//로컬전략 : 이메일 조회 => 패스워드 조회 => 유저 리턴
module.exports = () => {
        passport.use(new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password'
        }, async (email, password, done) => {
            try {
            const user = await User.findOne({ where : { email }})
            if(!user) {
                return done(null, false, { reason : "존재하지 않는 사용자입니다." }) //라우터의 err로 전달
            }
            const result = await bcrypt.compare(password, user.password)
            if(!result) {
                return done(null, false, { reason : "비밀번호가 일치하지 않습니다" })
            }
            return done(null, user) // 다 성공 시에 user를 반환한다.
        } catch (error) {
            console.error(error)
            return done(error)
        }
    }));
}