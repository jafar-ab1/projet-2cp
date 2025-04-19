const mongoose = require("mongoose");


const dealSchema = new mongoose.Schema({
  dealName: { type: String, required: true, unique: true },
  reservationsLeft: { type: Number, required: true },
  endDate: { type: Date, required: true },
  roomType: { type: String, enum: ["Standard", "Deluxe", "Suite"], required: true },
  status: { type: String, enum: ["Active", "Inactive", "Finished"], default: "Active" },
});

module.exports = mongoose.model("Deal", dealSchema);