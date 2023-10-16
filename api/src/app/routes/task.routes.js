const router = require("express").Router();
const {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
} = require("../controllers/task.controller");

router.get("/", getAll);

router.get("/:id", getTask);

router.post("/", createTask);

router.patch("/:id", updateTask);

router.patch("/task_completed/:id", toggleComplete);

router.delete("/:id", deleteTask);

module.exports = router;
