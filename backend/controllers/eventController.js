const Event = require("../models/Event");
const mongoose = require("mongoose");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.user._id,
    };

    const newEvent = new Event(eventData);
    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    res.status(400).json({
      error: "Event creation failed",
      details: error.message,
    });
  }
};

// Get all events with filtering and pagination
exports.getAllEvents = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    // Build query object
    const query = {};

    if (category) query.category = category;

    if (minPrice || maxPrice) {
      query.ticketPrice = {};
      if (minPrice) query.ticketPrice.$gte = parseFloat(minPrice);
      if (maxPrice) query.ticketPrice.$lte = parseFloat(maxPrice);
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { date: 1 },
    };

    const events = await Event.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: 1 });

    const total = await Event.countDocuments(query);

    res.json({
      events,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalEvents: total,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve events",
      details: error.message,
    });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "organizer",
      "firstName lastName email"
    );

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve event",
      details: error.message,
    });
  }
};

// Update an existing event
exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updateData = req.body;

    // Ensure the user is the organizer or an admin
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if the current user is the organizer or an admin
    if (
      event.organizer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        error: "Not authorized to update this event",
      });
    }

    // Prevent changing certain fields
    delete updateData.organizer;
    delete updateData.availableTickets;

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({
      error: "Event update failed",
      details: error.message,
    });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if the current user is the organizer or an admin
    if (
      event.organizer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        error: "Not authorized to delete this event",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Event deletion failed",
      details: error.message,
    });
  }
};
