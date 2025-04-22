const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  issueDescription: { type: String, required: true },
  email: { type: String, ref: "User", required: true },
  status: { type: String, enum: ["In-progress", "Completed"], default: "In-progress" },
  resolutionDate: { type: Date },
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);