const mongoose = require("mongoose");
const { nanoid } = require('nanoid');


const cleaningSchema = new mongoose.Schema({
  id: {type: String ,default: () => nanoid(8)},
  roomNumber: { type: Number, required: true },
  status: { type: String, enum: ["clean", "dirty", "inspected"], required: true },
  lastCleaned: { type: Date },
  nextCleaning: { type: Date },
});

module.exports = mongoose.model("Cleaning", cleaningSchema);