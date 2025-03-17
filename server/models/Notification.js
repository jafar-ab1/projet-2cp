const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true }, 
  type: { type: String, enum: ['Cleaning', 'Feedback', 'Other'], required: true }, 
  status: { type: String, enum: ['Unread', 'Read'], default: 'Unread' }, 
});

module.exports = mongoose.model('Notification', notificationSchema);;