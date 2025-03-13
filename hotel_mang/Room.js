const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    roomId:{type:number, default: () => new mongose.Types.ObjectId()},
    roomNumber: {type:number, unique:true},
    type:{type:String, enum:['Standard', 'Deluxe', 'Suite'], required:true},
    status: { type: String, enum: ['Occupied', 'Available'], required: true},
    price: {type: Number, required: true},
    floor:{type:String, required: true}
});

module.exports = mongoose.model("Room", RoomSchema);
