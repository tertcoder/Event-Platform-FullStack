const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        error: "No authentication token, authorization denied.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Please authenticate." });
    }

    // Attach user and token to request object
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token." });
    }
    res.status(500).json({ error: "Authentication failed." });
  }
};

// Middleware to check admin role
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "organizer") {
    return res.status(403).json({
      error: "Access denied. Organizer privileges required.",
    });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};
