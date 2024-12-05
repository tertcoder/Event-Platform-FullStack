const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
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
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// Authentication Routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// Event Routes
router.post("/events", authMiddleware, createEvent);
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.put("/events/:id", authMiddleware, updateEvent);
router.delete("/events/:id", authMiddleware, deleteEvent);

// Ticket Routes
router.post("/tickets/purchase", authMiddleware, purchaseTickets);
router.get("/tickets/my-tickets", authMiddleware, getUserTickets);
router.get("/tickets/validate/:ticketId", authMiddleware, validateTicket);

module.exports = router;
