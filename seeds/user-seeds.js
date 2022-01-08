const { User } = require("../models");

const userData = [
  {
    username: "zahramammadli",
    password: "test1",
  },
  {
    username: "joesmith",
    password: "test2",
  },
  {
    username: "janesmith",
    password: "test3",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
