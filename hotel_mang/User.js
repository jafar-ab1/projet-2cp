const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId:{type:number, default: () => new mongose.Types.ObjectId()},
    username : {type:String, required:true, unique:true},
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true, unique:true},
});

module.exports = mongoose.model("User", UserSchema);
