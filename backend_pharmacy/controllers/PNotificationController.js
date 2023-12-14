const Notification = require('../models/PNotificationModel');


const getNotifications = async (req, res) => {
  try {
    // Fetch notifications for the specified pharmacist
    const notifications = await Notification.find({}).exec();

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'An error occurred while fetching notifications' });
  }
};
module.exports = { getNotifications };