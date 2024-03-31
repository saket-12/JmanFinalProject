// certificate.js
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  certificateName: {
    type: String,
    required: true
  },
  organization: String,
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  // Add other relevant columns
});

const certificate = mongoose.model('Certificate', certificateSchema);
module.exports = certificate;
