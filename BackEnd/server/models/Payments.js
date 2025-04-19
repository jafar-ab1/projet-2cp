const mongoose = require("mongoose");
const { nanoid } = require('nanoid');

const PaymentSchema = new mongoose.Schema({
    id: {type: String ,default: () => nanoid(8)},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Guest", required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ["credit_card", "paypal", "cash"], required: true }
});

module.exports = mongoose.model('Payment', PaymentSchema);