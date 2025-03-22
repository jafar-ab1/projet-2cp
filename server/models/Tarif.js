import mongoose from 'mongoose';

const tarifSchema = new mongoose.Schema({
    roomType: { type: String, enum: ["Standard", "Deluxe", "Suite"], required: true },
    price: { type: Number, required: true },
    dealName: { type: String },
    cancellationPolicy: { type: String, enum: ["strict", "flexible", "refundable"], required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" }
})

const Tarif = mongoose.model('Tarif', tarifSchema);
export default Tarif;