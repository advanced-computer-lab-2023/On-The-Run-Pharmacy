

//create a new user
const { default: mongoose } = require('mongoose');


const Pharmacist = require('../models/PharmacistModel');

const createPharmacist = async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      hourly_rate,
      affiliation,
      educational_background,
      Working_license,
      Pharmacy_degree,
    } = req.body;

    const newPharmacist = new Pharmacist({
      username,
      password,
      name,
      email,
      hourly_rate,
      affiliation,
      educational_background,
      Working_license,
      Pharmacy_degree,
      Pharmacy_ID,
    });

    await newPharmacist.save();

    res.status(201).json({ message: 'Pharmacist registered successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while registering the Pharmacist' });
  }
};



const getPharmacists = async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find({}).sort({ createdAt: -1 });

    res.status(200).json(pharmacists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the Pharmacists' });
  }
};
const getPharmacistByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    
    // Use a case-insensitive regular expression to search for patients by name
    const pharmacist = await Pharmacist.findOne({ username: username });

    

    res.status(200).json(pharmacist);
  } catch (error) {
    console.error('Error searching for pharmacist by name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



  //const updatepharmacist = async (req, res) => {
  //  const { username } =  req.body;
 
  //  try {
       // Delete the pharmacist with the specified username
  //     const deletedUser = await userModel.findOneAndDelete({ username });
 
  //     if (!deletedUser) {
   //       return res.status(404).json({ message: 'Pharmacist not found' });
   //    }
 
   //    return res.status(200).json({ message: 'Pharmacist deleted successfully' });
   // } catch (error) {
   //    console.error(error);
    //   return res.status(500).json({ error: 'An error occurred while deleting the pharmacist' });
    //}
 //};


  const deletepharmacist = async (req, res) => {
    const { id } =  req.params;
 
    try {
       // Delete the pharmacist with the specified username
       const deletedUser = await Pharmacist.findByIdAndDelete({ _id:id });
 
       if (!deletedUser) {
          return res.status(404).json({ message: 'Pharmacist not found' });
       }
 
       return res.status(200).json({ message: 'Pharmacist deleted successfully' });
    } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'An error occurred while deleting the pharmacist' });
    }
 };

module.exports = { createPharmacist, getPharmacists, getPharmacistByUsername, deletepharmacist };