import mongoose from 'mongoose';

const cleaningSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  status: { type: String, enum: ["clean", "dirty", "inspected"], required: true },
  lastCleaned: { type: Date },
  nextCleaning: { type: Date },
});

const Cleaning = mongoose.model('Cleaning', cleaningSchema);
export default Cleaning;