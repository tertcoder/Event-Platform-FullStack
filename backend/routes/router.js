const express = require("express");
// const { registerUser, loginUser } = require("../controllers/authController");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const {
  purchaseTickets,
  getUserTickets,
  validateTicket,
} = require("../controllers/ticketController");
const authController = require("../controllers/authController");

const router = express.Router();

// Authentication Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/validate-token", authController.validateToken, (req, res) => {
  res.json({ user: req.user });
});
// router.get("/auth/validate-token", validateToken);

// Event Routes
// router.post("/events", authMiddleware, createEvent);
router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
// router.put("/events/:id", authMiddleware, updateEvent);
router.put("/events/:id", updateEvent);
// router.delete("/events/:id", authMiddleware, deleteEvent);
router.delete("/events/:id", deleteEvent);

// Ticket Routes
router.post("/tickets/purchase", purchaseTickets);
router.get("/tickets/my-tickets/:id", getUserTickets);
router.get("/tickets/validate/:ticketId", validateTicket);
// router.post("/tickets/purchase", authMiddleware, purchaseTickets);
// router.get("/tickets/my-tickets", authMiddleware, getUserTickets);
// router.get("/tickets/validate/:ticketId", authMiddleware, validateTicket);

module.exports = router;
