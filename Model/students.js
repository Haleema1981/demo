const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  skills: [String],
  enrolled: Boolean
});

module.exports = mongoose.model('Student', studentSchema);