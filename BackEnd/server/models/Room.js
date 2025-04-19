const { required } = require('joi');
const mongoose = require('mongoose');

const roomScehma = new mongoose.Schema({
    roomNumber: {type:Number, unique:true, required:true},
    type:{type:String, enum:['Standard', 'Deluxe', 'Suite'], required:true},
    bedType: { type: String, required: true ,  enum: ['Simple', 'Double']},
    facilities: { type: [String], required: true },
    status0: { type: String, enum: ['Occupied', 'Available','Dirty','Inspected','Clean'], default:'Available', required: true},
    status1: { type: String, enum: ['Available', 'Booked','Wailtelist'], default:'Available', required: true},
    floor:{type:String, required: true},
    price: {type:Number, required: true}
})

module.exports = mongoose.model('Room', roomScehma);