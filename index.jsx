const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000; // Define your port number here

// Middleware
app.use(express.json());
app.use(cors());

// 1. Connect to the BanoQabil database
mongoose.connect('mongodb://localhost:27017/BanoQabil')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Connection error:', err));

// 2. Create a Schema and Model for your Attendance table
const attendanceSchema = new mongoose.Schema({
  studentName: String,
  course: String,
  status: String
});
const Attendance = mongoose.model('Attendance', attendanceSchema, 'Attendance table');

// 3. GET route to fetch all attendance records
app.get('/api/attendance', async (req, res) => {
  try {
    const allRecords = await Attendance.find();
    res.json(allRecords);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// 4. POST route to add a new attendance record
app.post('/api/attendance', async (req, res) => {
  try {
    const newRecord = new Attendance({
      studentName: req.body.studentName,
      course: req.body.course,
      status: req.body.status
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: 'Error saving data' });
  }
});

// 5. Start the server (This goes at the very bottom!)
// Notice the backticks ` ` around the text
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));