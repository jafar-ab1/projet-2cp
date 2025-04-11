const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    guestId:{type: mongoose.Schema.Types.ObjectId},
    guestname : {type:String, required:true, unique:true},
    checkInDate: { type: Date, required: true }, 
    checkOutDate: { type: Date, required: true }, 
    feedback: { type: String }
})

module.exports = mongoose.model('Guest', guestSchema)