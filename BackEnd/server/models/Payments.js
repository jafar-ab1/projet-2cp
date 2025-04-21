const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    email: { type: String, ref: "User", required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ["Credit_card", "Paypal", "Cash"], required: true }
});

module.exports = mongoose.model('Payment', PaymentSchema);