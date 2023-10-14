const Sequelize = require("sequelize");
const sequelize = require("../helpers/database");

const { DataTypes } = Sequelize;

const Todo = sequelize.define(
  "todos",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Todo;
