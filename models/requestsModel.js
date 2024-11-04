const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  requestedSkills: [{ type: String }],
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    maxlength: 500,
  },
  responseDate: {
    type: Date,
  },
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;