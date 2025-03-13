const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  totalRooms: { type: Number, required: true },
  defaultRates: { type: Map, of: Number }, // Stocke les tarifs par type de chambre
  hotelName: { type: String, required: true }
});

module.exports = mongoose.model("Settings", SettingsSchema);
