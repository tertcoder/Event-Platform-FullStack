const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = userId => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// User Registration
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // Save user
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Registration failed",
      details: error.message,
    });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        error: "Invalid login credentials",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid login credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Login failed",
      details: error.message,
    });
  }
};
