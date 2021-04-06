module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      //id는 자동 생성
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
       charset: "utf8mb4",
       collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" }); // 해시태그 검색용
    db.Hashtag.belongsTo(db.Post); // 포스트에 속한 해시태그
  }; 
  return Hashtag;
};

// Hashtag 테이블 컬럼
// hashtagId, name, postId

// PostHashtag 테이블 컬럼
// postId, HashtagId
