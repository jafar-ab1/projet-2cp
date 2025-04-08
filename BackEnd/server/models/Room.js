const mongoose = require('mongoose');

const roomScehma = new mongoose.Schema({
    roomId:{type: Number,default: () => new mongoose.Types.ObjectId()},
    roomNumber: {type:String, unique:true, required:true},
    type:{type:String, enum:['Standard', 'Deluxe', 'Suite'], required:true},
    bedType: { type: String, required: true },
    facilities: { type: [String], required: true },
    status: { type: String, enum: ['Occupied', 'Available','dirty','inspected'],default:'available', required: true},
    floor:{type:String, required: true}
})

module.exports = mongoose.model('Room', roomScehma);