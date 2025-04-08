const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  issueDescription: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
  resolutionDate: { type: Date },
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);