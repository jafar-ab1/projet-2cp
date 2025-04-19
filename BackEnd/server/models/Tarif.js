const mongoose = require('mongoose');

const tarifSchema = new mongoose.Schema({
    roomType: { type: String, enum: ["Standard", "Deluxe", "Suite"], required: true },
    price: { type: Number, required: true }
})

module.exports = mongoose.model('Tarif', tarifSchema);