const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const FloorSchema = new mongoose.Schema({
  id: {type: String ,default: () => nanoid(8)},
  floorNumber: { type: Number, required: true },
  status: { type: String, enum: ["Complété", "À compléter"], default: "À compléter" }
});

module.exports = mongoose.model('Floor', FloorSchema);