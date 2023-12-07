// models/messagesModel.js
const mongoose = require('mongoose');
const Pharmacist = require('../models/PharmacistModel');

const messageSchema = new mongoose.Schema({
  patient: {
    type: String,
    ref: 'PatientP',
  },
  pharmacist: {
    type: String,
    ref: 'Pharmacist',
  },
  patientMessages: [
    {
      sender: String, // 'patient'
      content: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  pharmacistMessages: [
    {
      sender: String, // 'pharmacist'
      content: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
