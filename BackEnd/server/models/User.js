const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
    userId:{ type : mongoose.Schema.Types.ObjectId},
    username : {type:String, required:true, unique:true, minlength: 3, maxlength: 30},
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true, unique:true, minlength: 8},
    userRole: { type: String, required: true, enum: ['client', 'admin'], default: 'client'},
    telephone: {type: String, required: true}
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  const User = mongoose.model('User', userSchema);
  module.exports = User;