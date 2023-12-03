const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const SalesModel = mongoose.model('Sales', SalesSchema);

module.exports = SalesModel;