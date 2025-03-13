const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema({
  roomType: { type: String, enum: ["Standard", "Deluxe", "Suite"], required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Rate", RateSchema);
