// models/JobRequirement.js
const mongoose = require('mongoose');

const jobRequirementSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  document: { type: String, required: true }
});

module.exports = mongoose.model('JobRequirement', jobRequirementSchema);
