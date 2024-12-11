// routes/candidates.js
const express = require('express');
const multer = require('multer');
const Candidate = require('../models/Candidate');
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

// Create a new candidate
router.post('/', upload.single('cv'), async (req, res) => {
  try {
    const newCandidate = new Candidate({
      candidateName: req.body.candidateName,
      position: req.body.position,
      department: req.body.department,
      applicationDate: req.body.applicationDate,
      notes: req.body.notes,
      cv: req.file.path
    });

    await newCandidate.save();
    res.status(201).send(newCandidate);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).send(candidates);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a candidate by ID
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).send('Candidate not found');
    res.status(200).send(candidate);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a candidate
router.put('/:id', upload.single('cv'), async (req, res) => {
  try {
    const updatedData = {
      candidateName: req.body.candidateName,
      position: req.body.position,
      department: req.body.department,
      applicationDate: req.body.applicationDate,
      notes: req.body.notes,
      cv: req.file ? req.file.path : undefined
    };

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, omitUndefined: true }
    );

    if (!candidate) return res.status(404).send('Candidate not found');
    res.status(200).send(candidate);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a candidate
router.delete('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).send('Candidate not found');
    res.status(200).send('Candidate deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
