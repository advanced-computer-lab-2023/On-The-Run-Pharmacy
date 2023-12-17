const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const Doctor = require('../models/DoctorModel');


const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).sort({ createdAt: -1 });

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the Doctors' });
  }
};

module.exports = {getDoctors };