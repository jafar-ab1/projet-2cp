const { required } = require('joi');
const mongoose = require('mongoose');

const roomScehma = new mongoose.Schema({
    roomNumber: {type:Number, unique:true, required:true},
    type:{type:String, enum:['Standard', 'Deluxe', 'Suite'], required:true},
    bedType: { type: String, required: true ,  enum: ['Simple', 'Double']},
    facilities: { type: [String], required: true },
    status: { type: String, enum: ['Occupied', 'Available','dirty','inspected','clean'], default:'available', required: true},
    floor:{type:String, required: true},
    price: {type:Number, required: true}
})

module.exports = mongoose.model('Room', roomScehma);