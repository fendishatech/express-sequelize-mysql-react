const userModel = require("../models/user.model");
const todoModel = require("../models/todo.model");
const taskModel = require("../models/task.model");

// DEV
const sync_models = async () => {
  try {
    await userModel.sync();
    await todoModel.sync();
    await taskModel.sync();
    console.log("Table Migrated Successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

module.exports = sync_models;
