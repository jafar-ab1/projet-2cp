const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const { email } = require('../../config');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },  
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true, minlength: 8},
    mobileNumber: {type: String, required: true},
    role: { type: String, required: true, enum: ['client', 'admin'], default: 'client'},
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