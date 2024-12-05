const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [100, "Event title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [1000, "Event description cannot exceed 1000 characters"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    location: {
      venue: {
        type: String,
        required: [true, "Venue name is required"],
      },
      address: {
        street: {
          type: String,
          required: [true, "Street address is required"],
        },
        city: {
          type: String,
          required: [true, "City is required"],
        },
        state: {
          type: String,
          required: [true, "State is required"],
        },
        zipCode: {
          type: String,
          required: [true, "Zip code is required"],
        },
      },
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
      enum: [
        "Music",
        "Sports",
        "Conference",
        "Workshop",
        "Exhibition",
        "Theater",
        "Comedy",
        "Other",
      ],
    },
    ticketPrice: {
      type: Number,
      required: [true, "Ticket price is required"],
      min: [0, "Ticket price cannot be negative"],
    },
    totalTickets: {
      type: Number,
      required: [true, "Total number of tickets is required"],
      min: [1, "At least one ticket must be available"],
    },
    availableTickets: {
      type: Number,
      default: function () {
        return this.totalTickets;
      },
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "Organizer information is required"],
    },
    imageUrl: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["Active", "Sold Out", "Cancelled"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to update status based on available tickets
EventSchema.pre("save", function (next) {
  if (this.availableTickets === 0) {
    this.status = "Sold Out";
  }
  next();
});

// Method to check ticket availability
EventSchema.methods.isTicketAvailable = function (quantity = 1) {
  return this.availableTickets >= quantity;
};

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
