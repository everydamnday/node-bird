// 로그인했는지 확인하는 미들웨어
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else {
        res.status(401).send("로그인이 필요한 페이지 입니다")
    }
}

//로그아웃 상태인지 확인하는 미들웨어
exports.isLoggedOut = (req, res, next) => {
    if(!req.isAuthenticated()){
        next()
    } else {
        res.status(401).send("로그인한 사용자는 접근이 불가한 페이지 입니다")
    }
}

