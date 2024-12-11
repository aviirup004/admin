// models/Interviewer.js
const mongoose = require('mongoose');

const interviewerSchema = new mongoose.Schema({
  interviewerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, required: true }
});

module.exports = mongoose.model('Interviewer', interviewerSchema);
