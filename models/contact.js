var mongoose = require('mongoose');

//Contact Schema
var contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  number: String,
  created_at: {
    type: Date,
    default:Date.now
  }
});
var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
