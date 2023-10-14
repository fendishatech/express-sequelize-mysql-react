const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { updateUserSchema } = require("../validators/userRequestValidator");

const getUsers = async (req, res) => {
  const users = await User.findAll();
  return res.json({ users: users });
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);

  if (user) {
    return res.json({ user: user });
  }
  return res.json({ message: "User not Found" });
};

const updateUser = async (req, res) => {
  const { error } = updateUserSchema(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  const { first_name, last_name, email, phone_no } = req.body;

  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await User.update(
      { first_name, last_name, email, phone_no },
      { where: { id: userId }, returning: true }
    );

    return res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  // validate with joy

  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password matches the stored hashed password
    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await user.destroy();

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUsers, getUser, updateUser, changePassword, deleteUser };
