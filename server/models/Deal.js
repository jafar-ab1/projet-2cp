import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  dealName: { type: String, required: true },
  reservationsLeft: { type: Number, required: true },
  endDate: { type: Date, required: true },
  roomType: { type: String, enum: ["standard", "deluxe", "suite"], required: true },
  status: { type: String, enum: ["active", "inactive", "finished"], default: "active" },
});

const Deal = mongoose.model('Deal', dealSchema);
export default Deal;