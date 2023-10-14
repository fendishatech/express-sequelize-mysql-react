const Sequelize = require("sequelize");
const sequelize = require("../helpers/database");
const Todo = require("./todo.model");

const { DataTypes } = Sequelize;

const Task = sequelize.define(
  "tasks",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

Todo.hasMany(Task, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Task.belongsTo(Todo);

module.exports = Task;
