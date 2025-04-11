const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  totalRooms: { type: Number, required: true },
  defaultRates: { type: Map, of: Number }, 
  contactEmail: { type: String, required: true }, 
  contactPhone: { type: String, required: true } 
});

module.exports = mongoose.model('Settings', SettingsSchema);