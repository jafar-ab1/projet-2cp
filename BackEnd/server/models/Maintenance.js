const mongoose = require("mongoose");
const { nanoid } = require('nanoid');


const maintenanceSchema = new mongoose.Schema({
  id: {type: String ,default: () => nanoid(8)},
  roomNumber: { type: Number, required: true },
  issueDescription: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
  resolutionDate: { type: Date },
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);