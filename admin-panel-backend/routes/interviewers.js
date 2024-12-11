// routes/interviewers.js
const express = require('express');
const Interviewer = require('../models/Interviewer');
const router = express.Router();

// Create a new interviewer
router.post('/', async (req, res) => {
  try {
    const newInterviewer = new Interviewer(req.body);
    await newInterviewer.save();
    res.status(201).send(newInterviewer);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all interviewers
router.get('/', async (req, res) => {
  try {
    const interviewers = await Interviewer.find();
    res.status(200).send(interviewers);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get an interviewer by ID
router.get('/:id', async (req, res) => {
  try {
    const interviewer = await Interviewer.findById(req.params.id);
    if (!interviewer) return res.status(404).send('Interviewer not found');
    res.status(200).send(interviewer);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update an interviewer
router.put('/:id', async (req, res) => {
  try {
    const interviewer = await Interviewer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      omitUndefined: true
    });

    if (!interviewer) return res.status(404).send('Interviewer not found');
    res.status(200).send(interviewer);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete an interviewer
router.delete('/:id', async (req, res) => {
  try {
    const interviewer = await Interviewer.findByIdAndDelete(req.params.id);
    if (!interviewer) return res.status(404).send('Interviewer not found');
    res.status(200).send('Interviewer deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
