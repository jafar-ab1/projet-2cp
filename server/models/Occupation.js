import mongoose from 'mongoose';

const occupationSchema = new mongoose.Schema({
    month: {type:String, required:true},
    occupationRate: {type:Number, required:true},
    totalRooms: {type:Number, required:true},
    occupiedRooms: {type:Number, required:true},
    availbleRooms: {type:Number, required:true}
})

const Occupation = mongoose.model('Occupation', occupationSchema);
export default Occupation;