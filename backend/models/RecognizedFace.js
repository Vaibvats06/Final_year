const mongoose = require('mongoose');

const recognizedFaceSchema = new mongoose.Schema({
  timestamp: { type: String, required: true }, 
    name: { type: String, required: true },     
    roll_no: String,
    student_id: String,
    display_name: String
  },
 { collection: 'recognized_faces' }); // Force correct collection name

module.exports = mongoose.model('RecognizedFace', recognizedFaceSchema);