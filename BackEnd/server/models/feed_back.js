const mongoose = require('mongoose');


const feed_backSchema = new mongoose.Schema({
    email:{type: String, required: true, ref:'User'},
    roomNumber: {type: String, ref:'Room'},
    comment: {type:String, required:true},
    date : {type:Date, required:true}
});

module.exports = mongoose.model('feed_back', feed_backSchema);
