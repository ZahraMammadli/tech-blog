const { Model, DataTypes } = require("sequelize");
const sequlize = require("../config/connection");

class User extends Model {}

// creating user table
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {},
    password: {},
    email: {},
  },
  {
    sequelize,
  }
);
