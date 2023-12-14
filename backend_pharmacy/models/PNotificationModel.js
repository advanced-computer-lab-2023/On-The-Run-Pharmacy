const mongoose = require('mongoose');

const PNotificationSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true,
  },
  medicineName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PNotification = mongoose.model('PNotification', PNotificationSchema);

module.exports = PNotification;
