import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  totalRooms: { type: Number, required: true },
  defaultRates: { type: Map, of: Number }, 
  hotelName: { type: String, required: true },
  contactEmail: { type: String, required: true }, 
  contactPhone: { type: String, required: true } 
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;