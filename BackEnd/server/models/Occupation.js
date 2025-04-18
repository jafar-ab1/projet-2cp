const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const occupationSchema = new mongoose.Schema({
    id: {type: String ,default: () => nanoid(8)},
    month: {type:String, required:true},
    occupationRate: {type:Number, required:true},
    totalRooms: {type:Number, required:true},
    occupiedRooms: {type:Number, required:true},
    availbleRooms: {type:Number, required:true}
})

module.exports = mongoose.model('Occupation', occupationSchema);