module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      //id는 자동 생성
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 포스트의 글쓴이(일대다, 다)
    db.Post.belongsToMany(db.User, { through: "Like", as: "Liker" }); // 포스트에 좋아요 누른 유저(다대다)
    db.Post.hasMany(db.Comment); // 포스트의 코멘트(일대다,일)
    db.Post.hasMany(db.Image); // 포스트의 이미지(일대다, 일)
    db.Post.hasMany(db.Hashtag); // 포스트의 해시태그(일대다, 일)
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 해시태그의 포스트(일대다, 다)
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // 포스트를 리트윗한 포스트(일대다, 다)
  }; // 다른 테이블 간의 관계를 적어줌.
  return Post;
};

// 포스트 컬럼
// postId, content, user, image, comment, hashtag, Retweet(리트윗해온포스트의 id)

// PostHashtag 테이블 컬럼
// postId, HashtagId
