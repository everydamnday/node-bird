const express = require("express");
const cors = require('cors')
const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user")
const db = require("./models");
const app = express();
const passportConfig = require('./passport');
const session = require("express-session")
const passport = require("passport")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")
const morgan = require("morgan")
const path = require('path')
dotenv.config();

//db 연동
db.sequelize.sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(console.error);
  
// 패스포트 미들웨어
passportConfig();

//미들웨어
app.use(morgan('dev'));
app.use(cors({origin : true, credentials : true})) // cors 멀티 도메인 및 쿠키 허용
app.use(express.json());      // json 형식의 데이터를 해석해서 req.body 넣어줌
app.use(express.urlencoded({ extended : true })) // onsubmit된 데이터를 해석해서 req.body에 넣어줌
app.use("/", express.static(path.join(__dirname, 'uploads' )))
app.use(cookieParser(process.env.COOKIE_SECRET))  // 
app.use(session({
  saveUninitialized : false,
  resave : false,
  secret : process.env.COOKIE_SECRET,
}))
app.use(passport.initialize())
app.use(passport.session())

// 라우팅
// app.get("/", (req, res) => { res.send("hello home") }); // 초기 응답은 프론트 서버에서 담당
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);


//포트설정
const PORT = 3065;
app.listen(PORT, () => {
  console.log(`✅ started server on http://localhost:${PORT} 😀 `);
});

// server.listen(3065)하고 node app.js 하면 실행되는데 존나 멈춘 거 같이 생김.
// 그래서 콜백을 넣어서 콘솔로 알려준다.

// node 서버 로직
// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log(req.url, req.method);
//   res.end("Hello node");
// });
