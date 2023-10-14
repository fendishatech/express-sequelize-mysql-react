const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { createUserSchema } = require("../validators/userRequestValidator");
const createMulterUpload = require("../middleware/multerConfig");
// Define the file path for disk storage
const uploadPath = ".public/images/users/";

// Create the Multer upload function with the specified storage path
const upload = createMulterUpload(uploadPath);

const register = async (req, res) => {
  // Validation
  const { error } = createUserSchema(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  try {
    const { first_name, last_name, email, password, phone_no } = req.body;

    // Check if the email or phone number is already in use
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone_no }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone number already in use" });
    }

    let avatarPath = "";

    if (req.body.avatar) {
      // If the "avatar" field exists, upload the avatar
      upload.single("avatar")(req, res, (err) => {
        if (err) {
          // Handle Multer upload error
          return res.status(400).json({ error: err.message });
        }
        // Access uploaded file information via req.file
        avatarPath = req.file.path;
      });
    } else {
      avatarPath = "/public/images/users/default.png";
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the salt rounds (e.g., 10) as needed

    // Create a new user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      avatar: avatarPath,
      phone_no,
    });

    if (newUser) {
      // You can also generate and send an access token for auto-login if desired

      res.status(201).json({ message: "Registration successful" });
    } else {
      res.status(500).json({ message: "Something went wrong saving user." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { phone_no, password } = req.body;

    // Find the user by phone_no
    const user = await User.findOne({ where: { phone_no } });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate and send an access token (e.g., JWT)
    // const accessToken = generateAccessToken(user);

    // You can also handle refresh tokens here if needed
    // const refreshToken = generateRefreshToken(user);

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    // Implement your logout logic (e.g., invalidate tokens)

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, logout };
