// models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  applicationDate: { type: Date, default: Date.now },
  notes: { type: String },
  cv: { type: String, required: true }
});

module.exports = mongoose.model('Candidate', candidateSchema);
