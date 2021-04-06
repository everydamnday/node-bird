const passport = require("passport")
const local = require('./local');
const { User } = require("../models");

module.exports = () => {
    // 라우터에서 authenticate('local') 실행 시 serializeUser 실행.
    passport.serializeUser((user, done) => { //local.js에서 반환된 user를 첫번째 매개변수로 받음.
        done(null, user.id) //여기의 user.id가 deserializeUser의 첫 번째 매개변수로 이동
    });                     // req.session.passport.user에 user.id 저장

    // passport.session() 미들웨어 실행 시 deserializeUser 실행
    passport.deserializeUser(async (id, done) => {  // 매개변수 id는 req.session.passport.user에 저장된 값
        try {
            const user = await User.findOne({ where : { id } })
            done(null, user) // req.user 생김
        } catch (error) {
            console.error(error)
            done(error)
        }   
    });

    local();
}
