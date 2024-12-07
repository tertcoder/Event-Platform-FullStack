const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const authController = {
  async register(req, res) {
    try {
      const { email, password, name, contact } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user with default client role
      const user = new User({
        email,
        password,
        name,
        role: "client",
        contact: contact || {},
      });
      await user.save();

      // Generate token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          contact: user.contact,
        },
        token,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Registration failed", error: error.message });
    }
  },

  async login(req, res) {
    try {
      // Verify JWT_SECRET is set
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not set");
        return res.status(500).json({ message: "Server configuration error" });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token
      try {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        res.json({
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            contact: user.contact,
          },
          token,
        });
      } catch (tokenError) {
        console.error("Token generation error:", tokenError);
        res.status(500).json({
          message: "Token generation failed",
          error: tokenError.message,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed", error: error.message });
    }
  },

  // Token validation middleware
  async validateToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Optional: Fetch user to ensure they still exist and get latest info
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  },
};

module.exports = authController;
