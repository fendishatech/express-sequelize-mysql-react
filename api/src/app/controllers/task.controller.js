const Task = require("../models/task.model");
const Todo = require("../models/todo.model");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validators/taskRequestValidator");

const createTask = async (req, res) => {
  // Validation
  const { error } = createTaskSchema(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  try {
    const { todoId, title, completed } = req.body;

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.json({
        message: "Todo with this id doesn't exist",
      });
    }

    // Create a new task
    const newTask = await Task.create({ todoId, title, completed });

    if (newTask) {
      res.status(201).json({ message: "Task added successfully" });
    } else {
      res.status(500).json({ message: "Something went wrong saving task." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const tasks = await Task.findAll();

    if (tasks.length === 0) {
      return res.status(200).json({ message: "No records yet." });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res
        .status(200)
        .json({ message: "Task record could not be found." });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  const { error } = updateTaskSchema(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  const { title, description, completed } = req.body;

  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task record not found" });
    }

    const result = await Task.update(
      { title, description, completed },
      { where: { id: taskId }, returning: true }
    );

    return res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res
        .status(200)
        .json({ message: "Task record could not be found." });
    }

    task.destroy();
    return res.status(200).json({
      message: "task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
