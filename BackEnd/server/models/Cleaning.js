const mongoose = require("mongoose");

const cleaningSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  status: { type: String, enum: ["Clean", "Dirty", "Inspected"], required: true },
  lastCleaned: { type: Date },
  nextCleaning: { type: Date },
});

module.exports = mongoose.model("Cleaning", cleaningSchema);