const { Op } = require("sequelize");
const Todo = require("../models/todo.model");
const Task = require("../models/task.model");
const {
  createTodoSchema,
  updateTodoSchema,
} = require("../validators/todoRequestValidator");

const createTodo = async (req, res) => {
  // Validation
  const { error } = createTodoSchema(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  try {
    const { title, description, completed } = req.body;

    // Create a new todo
    const newTodo = await Todo.create({ title, description, completed });

    if (newTodo) {
      res.status(201).json({ message: "Todo added successfully" });
    } else {
      res.status(500).json({ message: "Something went wrong saving todo." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    let { page, limit } = req.query;
    let offset = 0;

    if (!limit || isNaN(limit) || limit <= 0) {
      limit = 3;
    }

    const totalTodos = await Todo.count();
    const totalPages = Math.ceil(totalTodos / limit);

    if (!page || isNaN(page) || page <= 0) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    offset = (page - 1) * limit;

    const todos = await Todo.findAll({
      include: Task,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    if (todos.length === 0) {
      return res.status(200).json({ message: "No records yet." });
    }

    const currentPage = parseInt(page);
    const currentCount = todos.length;

    // const hasNextPage = currentPage < totalPages;
    // const hasPreviousPage = currentPage > totalPages;

    // const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    // const previousPageUrl = hasPreviousPage
    //   ? `${baseUrl}&page=${currentPage - 1}`
    //   : null;
    // const nextPageUrl = hasNextPage
    //   ? `${baseUrl}&page=${currentPage + 1}`
    //   : null;

    return res.status(200).json({
      data: todos,
      pagination: {
        currentPage,
        todosPerPage: limit,
        totalTodos,
        currentCount,
        totalPages,
        // previousPageUrl,
        // nextPageUrl,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const filterTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.query;

    const filter = {};

    if (title) {
      filter.title = { [Op.like]: `%${title}%` };
    }
    if (description) {
      filter.description = { [Op.like]: `%${description}%` };
    }
    if (completed) {
      filter.completed = completed === "true";
    }

    const todos = await Todo.findAll({
      where: filter,
    });

    return res.json({
      todos,
    });
  } catch (error) {
    console.log("Error", error.message);
  }
};

const searchTodo = async (req, res) => {
  try {
    const { q } = req.query;

    const todos = await Todo.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${q}%`,
            },
          },
        ],
      },
    });

    return res.json({
      message: "inside searching controller",
      todos,
    });
  } catch (error) {
    console.log("Error", error.message);
  }
};

const getTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findByPk(todoId, {
      include: Task,
    });

    if (!todo) {
      return res
        .status(200)
        .json({ message: "Todo record could not be found." });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  const { error } = updateTodoSchema(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  const { title, description, completed } = req.body;

  const todoId = req.params.id;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo record not found" });
    }

    const result = await Todo.update(
      { title, description, completed },
      { where: { id: todoId }, returning: true }
    );

    return res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res
        .status(200)
        .json({ message: "Todo record could not be found." });
    }
    todo.destroy();
    return res.status(200).json({ message: "Todo deleted Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAll,
  getTodo,
  filterTodo,
  searchTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
