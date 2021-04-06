const Sequelize = require("sequelize"); // 시퀄라이즈 불러오기
const env = process.env.NODE_ENV || "development"; // 기본값 개발모드
const config = require("../config/config")[env]; // config 파일에서 개발모드 설정 불러오기
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// db 테이블 시퀄라이즈 등록
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);

// db간 관계성 연결
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//db 모듈
module.exports = db;

// 모델 관계표
// User
// - hasMany : Post     유저가 쓴 게시글
// - hasMany : Comment  유저가 쓴 댓글
// - belongsToMany : User {as "Follower"} : 유저의 팔로워
// - belongsToMany : User {as "Followings"} : 유저의 팔로잉

// Post
// - belongsTo : User   게시글을 쓴 유저
// - hasMany : Comment, Image, Hashtag 게시글이 갖는 코멘트, 이미지, 해시태그
// - belongsToMany : Hashtag 해시태그가 적힌 게시글
// - belongsTo : Post {as "Retweet"} 리트윗 해온 포스트

// Comment
// - belongsTo : Post   코멘트가 속한 게시글

// Hashtag
// - belongsTo : Post   해시태그가 속한 게시글
// - belongsToMany : Post 해시태그가 갖는 게시글

// Image
// - belongsTo : Post 이미지가 속한 게시글
