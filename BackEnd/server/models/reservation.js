const mongoose = require("mongoose");
const { nanoid } = require('nanoid');

const ReservationSchema = new mongoose.Schema({
    id: {type: String ,default: () => nanoid(8)},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Due in", "Checked out", "Due out", "Checked in"], default: "Due in" }
});

module.exports = mongoose.model('Reservation', ReservationSchema);