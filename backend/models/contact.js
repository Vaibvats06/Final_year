const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  timestamp: { type: String, required: true }, 
    name: { type: String, required: true },     
    email: String,
    message: String, 
  },
); // Force correct collection name

module.exports = mongoose.model('Contact', ContactSchema);