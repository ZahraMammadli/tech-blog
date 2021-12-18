const { Sequelize } = require("sequelize");
require("dotenv").config();

// creating connection
const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
  }
);

module.exports = connection;
