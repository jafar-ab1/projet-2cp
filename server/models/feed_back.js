const mongoose = require('mongoose');

const feed_backSchema = new mongoose.Schema({
    guestId:{type: mongoose.Schema.Types.ObjectId, ref:'Guest'},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref:'Room'},
    roomNumber: { type: String, required: true },
    comment: {type:String},
    date : {type:Date}
});

module.exports = mongoose.model('feed_back', feed_backSchema);
