const mongoose = require('mongoose');
const { nanoid } = require('nanoid');


const feed_backSchema = new mongoose.Schema({
    id: {type: String ,default: () => nanoid(8)},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref:'Room'},
    comment: {type:String},
    date : {type:Date}
});

module.exports = mongoose.model('feed_back', feed_backSchema);
