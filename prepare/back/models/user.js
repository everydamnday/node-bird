module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // Mysql 에서는 User 테이블이 users 로 저장됨(소문자,복수형 : 규칙)
    {
      //id는 자동 생성
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT
        allowNull: false, //필수
        unique : true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 유저가 쓴 포스트
    db.User.hasMany(db.Comment); // 유저가 쓴 댓글
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followers", foreignKey: "FollowingsId" });
    db.User.belongsToMany(db.User, {through: "Follow", as: "Followings", foreignKey: "FollowersId" });
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // 유저가 좋아요 누른 포스트(다대다, 일)
  };
  return User;
};

// User 컬럼
// userId, email, nickname, password, Followers, Followings

// UserPost 컬럼
// Liked Liker


