// projectExperience.js
const mongoose = require('mongoose');

const projectExperienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalHoursWorked: {
    type: Number,
    required: true
  },
  techUsed: {
    type: String,
    required: true
  },
  performance: {
    type: String,
    enum: ['good', 'average', 'excellent'],
    required: true
  },
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

const ProjectExperience = mongoose.model('ProjectExperience', projectExperienceSchema);
module.exports = ProjectExperience;
