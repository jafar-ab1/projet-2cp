const mongoose = require("mongoose");
const { nanoid } = require('nanoid');


const dealSchema = new mongoose.Schema({
  id: {type: String ,default: () => nanoid(8)},
  dealName: { type: String, required: true, unique: true },
  reservationsLeft: { type: Number, required: true },
  endDate: { type: Date, required: true },
  roomType: { type: String, enum: ["standard", "deluxe", "suite"], required: true },
  status: { type: String, enum: ["active", "inactive", "finished"], default: "active" },
});

module.exports = mongoose.model("Deal", dealSchema);