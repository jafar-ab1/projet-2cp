import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
    guestId:{type: Number, default: () => new mongoose.Types.ObjectId()},
    guestname : {type:String, required:true, unique:true},
    checkInDate: { type: Date, required: true }, 
    checkOutDate: { type: Date, required: true }, 
    feedback: { type: String }, 
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
})
const Guest = mongoose.model('Guest', guestSchema);
export default Guest;