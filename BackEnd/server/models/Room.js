const { required } = require('joi');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const roomScehma = new mongoose.Schema({
    id: {type: String ,default: () => nanoid(8)},
    roomNumber: {type:Number, unique:true, required:true},
    type:{type:String, enum:['Standard', 'Deluxe', 'Suite'], required:true},
    bedType: { type: String, required: true ,  enum: ['Simple', 'Double']},
    facilities: { type: [String], required: true },
    status0: { type: String, enum: ['Occupied', 'Available','dirty','inspected','clean'], default:'available', required: true},
    status1: { type: String, enum: ['available', 'booked','wailtelist'], default:'available', required: true},
    floor:{type:String, required: true},
    price: {type:Number, required: true}
})

module.exports = mongoose.model('Room', roomScehma);