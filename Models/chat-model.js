const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  message: {
    type: String,
    require: true,
  },
  sender: {
    type: String,
    ref: 'User',
    require: true,
  },
  reciever: {
    type: String,
    require: true,
    ref: 'User',
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

// Indexes
chatSchema.index({ sender: 1, reciever: 1 });
chatSchema.index({ timeStamp: -1 });

const chat = mongoose.model('chat', chatSchema);

module.exports = chat;
