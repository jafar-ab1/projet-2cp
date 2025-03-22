import mongoose from 'mongoose';

const FloorSchema = new mongoose.Schema({
  floorNb: { type: Number, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  status: { type: String, enum: ["Complété", "À compléter"], default: "À compléter" }
});

const Floor = mongoose.model('Floor', FloorSchema);
export default Floor;