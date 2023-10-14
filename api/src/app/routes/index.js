const router = require("express").Router();
// ROUTES
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const todoRoutes = require("./todo.routes");
const taskRoutes = require("./task.routes");

router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/todos", todoRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
