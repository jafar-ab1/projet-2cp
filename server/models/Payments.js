import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    guestId: { type: mongoose.Schema.Types.ObjectId, ref: "Guest", required: true },
    reservationId: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation", required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ["credit_card", "paypal", "cash"], required: true }
});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;