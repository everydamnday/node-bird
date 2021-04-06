module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      //id는 자동 생성
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.Post); // 포스트에 속한 코멘트
    db.Comment.belongsTo(db.User); // 유저에 속한 코멘트
  }; // 다른 테이블 간의 관계를 적어줌.
  return Comment;
};


// 코멘트 컬럼
// commentId, content, postId, userId