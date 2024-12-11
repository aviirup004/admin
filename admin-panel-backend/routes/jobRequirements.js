// routes/jobRequirements.js
const express = require('express');
const multer = require('multer');
const JobRequirement = require('../models/JobRequirement');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Create a new job requirement
router.post('/', upload.single('document'), async (req, res) => {
  try {
    const newJobRequirement = new JobRequirement({
      candidateId: req.body.candidateId,
      document: req.file.path
    });

    await newJobRequirement.save();
    res.status(201).send(newJobRequirement);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all job requirements
router.get('/', async (req, res) => {
  try {
    const jobRequirements = await JobRequirement.find().populate('candidateId');
    res.status(200).send(jobRequirements);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a job requirement by ID
router.get('/:id', async (req, res) => {
  try {
    const jobRequirement = await JobRequirement.findById(req.params.id).populate('candidateId');
    if (!jobRequirement) return res.status(404).send('Job requirement not found');
    res.status(200).send(jobRequirement);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a job requirement
router.delete('/:id', async (req, res) => {
  try {
    const jobRequirement = await JobRequirement.findByIdAndDelete(req.params.id);
    if (!jobRequirement) return res.status(404).send('Job requirement not found');
    res.status(200).send('Job requirement deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
