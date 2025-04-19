const mongoose = require('mongoose');


const feed_backSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref:'Room'},
    comment: {type:String, required:true},
    date : {type:Date}
});

module.exports = mongoose.model('feed_back', feed_backSchema);
