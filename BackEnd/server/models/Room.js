const mongoose = require('mongoose');
const { brotliDecompress } = require('zlib');

const roomScehma = new mongoose.Schema({
    roomNumber: {type:String, unique:true, required:true},
    type:{type:String, enum:['Standard', 'Deluxe', 'Suite'], required:true},
    facilities: { type: [String], required: false },
    status0: { type: String, enum: ['Maked up', 'Not Maked up'], default:'Maked up', required: false},
    status1: { type: String, enum: ['Available', 'Occupied'], default:'Available', required: false},
    floor:{type:String, required: true},
    price: {type:Number, required: false},
    capacity: {type:Number, required: false},
    bedType: {type:String, required: false},
    size: {type:String, required: false}
})

module.exports = mongoose.model('Room', roomScehma);