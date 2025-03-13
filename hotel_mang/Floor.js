const mongoose = require("mongoose");

const FloorSchema = new mongoose.Schema({
  floorNumber: { type: Number, required: true },
  status: { type: String, enum: ["Complété", "À compléter"], default: "À compléter" }
});

module.exports = mongoose.model("Floor", FloorSchema);
