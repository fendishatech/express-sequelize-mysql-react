const router = require("express").Router();
const {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

router.get("/", getAll);

router.get("/:id", getTask);

router.post("/", createTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
