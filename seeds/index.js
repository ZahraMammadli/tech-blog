const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models/index");
const seedUsers = require("./users.json");
const seedPosts = require("./posts.json");
const seedComments = require("./comments.json");

const createUsers = async (seedUsers) => {
  return await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });
};
const createPosts = async (seedPosts) => {
  return await Post.bulkCreate(seedPosts);
};
const createComments = async (seedComments) => {
  return await Comment.bulkCreate(seedComments);
};

const seed = async () => {
  await sequelize.sync({ force: true });
  await createUsers(seedUsers);
  await createPosts(seedPosts);
  await createComments(seedComments);
  await sequelize.close();
};

seed();
