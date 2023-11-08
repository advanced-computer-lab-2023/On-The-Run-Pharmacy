const PatientP = require('../models/PatientPModel');

const { default: mongoose } = require('mongoose');

const createPatientP = async(req,res) => {
   try{ const {
        username,
        name,
        email,
        password,
        date_of_birth,
        gender,
        mobile_number,
        emergency_contact,
        address
        
      } = req.body;
      const newPatientP = new PatientP({
        username,
        password,
        name,
        email,
        date_of_birth,
        gender,
        mobile_number,
        emergency_contact,
        address

      });
      await newPatientP.save();

    res.status(201).json({ message: 'Pharmacy Patient registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the Patient' });
  }
};

const getPatientsP=async(req,res) =>{
  const patients =await PatientP.find({}).sort({createdAt:-1});
      for(let index=0;index<patients.length;index++){
         const element = [patients][index];
         //console.log(element.id);
      }
      res.status(200).json(patients)
};

const getPatientP = async (req, res) => {
    const {username} = req.body;

    try {
        const patient = await PatientP.findOne({username : username });
  
      res.status(200).json(patient);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'An error occurred while retrieving the Patient' });
    }
  };

  const deletePatientP = async (req, res) => {
    const { id } = req.params;
 
    try {
       // Delete the pharmacist with the specified username
       const deletedUser = await PatientP.findByIdAndDelete({ _id:id });
 
       if (!deletedUser) {
          return res.status(404).json({ message: 'Patient not found' });
       }
 
       return res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'An error occurred while deleting the Patient' });
    }
 };

  const addAddress = async (req, res) => {
  const { username, address } = req.params;

  try {
    const updatedPatient = await PatientP.findOneAndUpdate(
      { username: username },
      { $push: { address: address } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json(updatedPatient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while adding the address' });
  }
};

const getAddresses = async (req, res) => {
  const { username } = req.params;

  try {
    const patient = await PatientP.findOne({ username: username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json(patient.address);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while getting the addresses' });
  }
};




module.exports={createPatientP, getPatientsP, deletePatientP, getPatientP, addAddress,getAddresses}