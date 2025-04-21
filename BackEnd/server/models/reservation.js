const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    roomNumber: [{ type:Number, ref: "Room", required: true }],
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required:true, enum: ["Due in", "Checked out", "Due out", "Checked in"], default: "Due in" }
});

module.exports = mongoose.model('Reservation', ReservationSchema);