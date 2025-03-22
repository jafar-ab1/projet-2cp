import mongoose from 'mongoose';

const feed_backSchema = new mongoose.Schema({
    guestId:{type: mongoose.Schema.Types.ObjectId, ref:'Guest'},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref:'Room'},
    roomNumber: { type: String, required: true },
    comment: {type:String},
    date : {type:Date}
});

const Feed_back = mongoose.model('Feed_back', feed_backSchema);
export default Feed_back;
