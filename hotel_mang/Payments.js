const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation", required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ["credit_card", "paypal", "cash"], required: true }
});

module.exports = mongoose.model("Payment", PaymentSchema);
