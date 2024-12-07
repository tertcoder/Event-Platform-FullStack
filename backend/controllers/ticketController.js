const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const User = require("../models/User");

// Purchase tickets for an event
exports.purchaseTickets = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    const userId = req.body.user.id;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check ticket availability
    if (event.availableTickets < quantity) {
      return res.status(400).json({ error: "Not enough tickets available" });
    }

    // Calculate total price
    const totalPrice = event.ticketPrice * quantity;

    // Create new ticket
    const newTicket = new Ticket({
      event: eventId,
      user: userId,
      quantity,
      totalPrice,
      status: "Active", // Adding a default status
    });

    // Save ticket
    await newTicket.save();

    // Update event available tickets
    event.availableTickets -= quantity;
    await event.save();

    // Update user's tickets (optional, depends on your user model)
    await User.findByIdAndUpdate(userId, { $push: { tickets: newTicket._id } });

    res.status(201).json({
      message: "Tickets purchased successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Ticket purchase error:", error);
    res.status(500).json({
      error: "Ticket purchase failed",
      details: error.message,
    });
  }
};

// Get user's tickets (simplified version)
exports.getUserTickets = async (req, res) => {
  try {
    console.log(req);
    // Option 1: Find tickets by user ID
    // const tickets = await Ticket.find({ user: req.param.id })
    //   .populate("event", "title date location")
    //   .sort({ createdAt: -1 }); // Sort by most recent first

    // Option 2: If you prefer getting tickets directly from user
    const user = await User.findById(req.param.id).populate({
      path: "tickets",
      populate: {
        path: "event",
        select: "title date location",
      },
    });
    const tickets = user.tickets;

    res.json({
      tickets,
      count: tickets.length,
    });
  } catch (error) {
    console.error("Get user tickets error:", error);
    res.status(500).json({
      error: "Failed to retrieve tickets",
      details: error.message,
    });
  }
};

// Validate ticket (for event entry)
exports.validateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findOne({
      _id: ticketId, // Changed from uniqueTicketId to _id
    }).populate("event");

    if (!ticket) {
      return res.status(404).json({ error: "Invalid ticket" });
    }

    if (ticket.status !== "Active") {
      return res.status(400).json({ error: "Ticket is not active" });
    }

    // Update ticket status to used
    ticket.status = "Used";
    await ticket.save();

    res.json({
      message: "Ticket validated successfully",
      event: ticket.event,
      ticketDetails: {
        id: ticket._id,
        quantity: ticket.quantity,
      },
    });
  } catch (error) {
    console.error("Ticket validation error:", error);
    res.status(500).json({
      error: "Ticket validation failed",
      details: error.message,
    });
  }
};
