const express = require("express");
const cors = require("cors");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const routes = require("./routes/router");
app.use("/api/v1", routes);

// 404 Not Found handler
app.use((req, res, next) => {
  res.status(404).json({
    error: "Endpoint not found",
  });
});

module.exports = app;
