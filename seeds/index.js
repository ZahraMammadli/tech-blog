const sequelize = require("../config/connection");
const User = require("../models/user");
const seedUsers = require("../seeds/users.json");

const createUsers = async (seedUsers) => {
  return await User.bulkCreate(seedUsers);
  // we need to give array of users to bulk create
};

const seed = async () => {
  await sequelize.sync({ force: true });
  const users = await createUsers(seedUsers);
  users.forEach((u) => u.printInfo()); // printing info on each user

  await sequelize.close();
};

seed();
