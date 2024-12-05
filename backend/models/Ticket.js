const mongoose = require("mongoose");
const QRCode = require("qrcode");

const TicketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event reference is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Ticket quantity is required"],
      min: [1, "At least one ticket must be purchased"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    uniqueTicketId: {
      type: String,
      unique: true,
    },
    qrCodeData: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Used", "Cancelled"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique ticket ID
TicketSchema.pre("save", async function (next) {
  if (!this.uniqueTicketId) {
    // Generate a unique ticket ID
    this.uniqueTicketId = `TKT-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  // Generate QR code data
  try {
    this.qrCodeData = await QRCode.toDataURL(this.uniqueTicketId);
    next();
  } catch (error) {
    next(error);
  }
});

const Ticket = mongoose.model("Ticket", TicketSchema);
module.exports = Ticket;
