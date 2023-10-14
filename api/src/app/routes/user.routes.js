const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateUser,
  changePassword,
  deleteUser,
} = require("../controllers/user.controller");

router.get("/", getUsers);

router.get("/:id", getUser);

router.patch("/:id", updateUser);
router.put("/:id", updateUser);

router.put("/change-password/:id", changePassword);

router.delete("/:id", deleteUser);

module.exports = router;
