// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const candidateRoutes = require('./routes/candidates');
const interviewerRoutes = require('./routes/interviewers');
const jobRequirementRoutes = require('./routes/jobRequirements');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Serve API routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/interviewers', interviewerRoutes);
app.use('/api/job-requirements', jobRequirementRoutes);

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Catch-all handler for any request that doesn't match the above routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Database Connection
mongoose.connect('mongodb://localhost:27017/admin-panel')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
