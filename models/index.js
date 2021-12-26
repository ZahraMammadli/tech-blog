const Post = require("./posts");
const User = require("./user");
const Comment = require("./comments");

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  // When we delete a Post, we make sure to also delete the associated comments.
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// We package our models and export them as an object so we can import them together and use their proper names
module.exports = { Post, User, Comment };
