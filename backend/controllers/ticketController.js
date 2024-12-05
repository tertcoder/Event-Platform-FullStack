const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const User = require("../models/User");

// Purchase tickets for an event
exports.purchaseTickets = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { eventId, quantity } = req.body;
    const userId = req.user._id;

    // Find the event
    const event = await Event.findById(eventId).session(session);
    if (!event) {
      throw new Error("Event not found");
    }

    // Check ticket availability
    if (!event.isTicketAvailable(quantity)) {
      throw new Error("Not enough tickets available");
    }

    // Calculate total price
    const totalPrice = event.ticketPrice * quantity;

    // Create new ticket
    const newTicket = new Ticket({
      event: eventId,
      user: userId,
      quantity,
      totalPrice,
    });

    // Save ticket
    await newTicket.save({ session });

    // Update event available tickets
    event.availableTickets -= quantity;
    await event.save({ session });

    // Update user's tickets
    await User.findByIdAndUpdate(
      userId,
      { $push: { tickets: newTicket._id } },
      { session }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Tickets purchased successfully",
      ticket: newTicket,
    });
  } catch (error) {
    // Abort transaction
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      error: "Ticket purchase failed",
      details: error.message,
    });
  }
};

// Get user's tickets
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).populate(
      "event",
      "title date location"
    );

    res.json({
      tickets,
      count: tickets.length,
    });
  } catch (error) {
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
      uniqueTicketId: ticketId,
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
        id: ticket.uniqueTicketId,
        quantity: ticket.quantity,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Ticket validation failed",
      details: error.message,
    });
  }
};
