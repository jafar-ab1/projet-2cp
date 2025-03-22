import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    reservationId: { type: String, required: true, unique: true },
    guestId: { type: mongoose.Schema.Types.ObjectId, ref: "Guest", required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;