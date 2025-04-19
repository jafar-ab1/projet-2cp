const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const tarifSchema = new mongoose.Schema({
    id: {type: String ,default: () => nanoid(8)},
    roomType: { type: String, enum: ["Standard", "Deluxe", "Suite"], required: true },
    price: { type: Number, required: true }
})

module.exports = mongoose.model('Tarif', tarifSchema);