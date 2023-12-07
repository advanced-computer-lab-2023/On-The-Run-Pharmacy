// controllers/messagesController.js
const Message = require('../models/messagesModel');
const PatientP = require('../models/PatientPModel');
const Pharmacist = require('../models/PharmacistModel');

const createMessage = async (req, res) => {
  const { patientUsername, pharmacistUsername } = req.body;

  try {
    // Check if a message object already exists
    const existingMessage = await Message.findOne({
      patient: patientUsername, // Assuming user is authenticated and the patient's ID is in req.user._id
      pharmacist: pharmacistUsername, // Replace this with the pharmacist's ID or username
    });
    if (!existingMessage) {
      // Create a new message object if none exists
      const newMessage = new Message({
        patient: patientUsername,
        pharmacist: pharmacistUsername, // Replace this with the pharmacist's ID or username
      });

      await newMessage.save();
      
      // Link the new message with patient and pharmacist
      await PatientP.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { messages: newMessage._id } },
        { new: true }
      );
      await Pharmacist.findOneAndUpdate(
        { username: pharmacistUsername }, // Replace this with the pharmacist's ID or username
        { $push: { messages: newMessage._id } },
        { new: true }
      );
    }

    // Redirect the patient to the chat page
    res.redirect(`/chat/${patientUsername}/${pharmacistUsername}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the message object' });
  }
};
const getChatMessages = async (req, res) => {
  const { sender, receiver } = req.params;

  try {
    // Fetch messages based on sender and receiver
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });
    
    // Extract only the necessary fields from patientMessages and pharmacistMessages
    const formattedMessages = messages.map((message) => ({
      patientMessages: message.patientMessages.map((patientMsg) => ({
        sender: patientMsg.sender,
        content: patientMsg.content,
      })),
      pharmacistMessages: message.pharmacistMessages.map((pharmacistMsg) => ({
        sender: pharmacistMsg.sender,
        content: pharmacistMsg.content,
      })),
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const sendMessageAsPatient = async (req, res) => {
  const { sender, receiver, message } = req.body;

  try {
    // Find or create the existing message
    let existingMessage = await Message.findOne({
      $or: [
        { sender, receiver },
        { patient: sender, pharmacist: receiver },
      ],
    });

    if (!existingMessage) {
      // Create a new message object if none exists
      existingMessage = new Message({
        patient: sender,
        pharmacist: receiver,
      });

      await existingMessage.save();

      // Link the new message with patient and pharmacist
      await PatientP.findOneAndUpdate(
        { username: sender },
        { $push: { messages: existingMessage._id } },
        { new: true }
      );
      await Pharmacist.findOneAndUpdate(
        { username: receiver },
        { $push: { messages: existingMessage._id } },
        { new: true }
      );
    }

    // Update the existing message by pushing the new message details
    existingMessage.patientMessages.push({
      content: message,
      timestamp: Date.now(),
    });

    // Save the updated message
    await existingMessage.save();

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const sendMessageAsPharmacist = async (req, res) => {
  const { sender, receiver, message } = req.body;

  try {
    // Find or create the existing message
    let existingMessage = await Message.findOne({
      $or: [
        { sender, receiver },
        { pharmacist: sender, patient: receiver },
      ],
    });

    if (!existingMessage) {
      // Create a new message object if none exists
      existingMessage = new Message({
        pharmacist: sender,
        patient: receiver,
      });

      await existingMessage.save();

      // Link the new message with pharmacist and patient
      await Pharmacist.findOneAndUpdate(
        { username: sender },
        { $push: { messages: existingMessage._id } },
        { new: true }
      );
      await PatientP.findOneAndUpdate(
        { username: receiver },
        { $push: { messages: existingMessage._id } },
        { new: true }
      );
    }

    // Update the existing message by pushing the new message details
    existingMessage.pharmacistMessages.push({
      content: message,
      timestamp: Date.now(),
    });

    // Save the updated message
    await existingMessage.save();

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = { createMessage,getChatMessages,sendMessageAsPatient,sendMessageAsPharmacist };
