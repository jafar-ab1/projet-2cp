const mongoose = require("mongoose");


const ReservationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    roomNumber: [{ type: String, ref: "Room", required: false }],
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: false },
    status: {
      type: String,
      enum: ["Due in", "Checked out", "Due out", "Checked in"],
      default: "Due in"
    }
  });
  
  module.exports = mongoose.model("Reservation", ReservationSchema);