const PatientP = require('../models/PatientPModel');

const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

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
        
      } = req.body;
      const newPatientP = new PatientP({
        username,
        password,
        name,
        email,
        date_of_birth,
        gender,
        mobile_number,
        emergency_contact

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

 const getPatientByUsername = async (req, res) => {
  const { username } = req.params; // Get the username from the URL parameter

  try {
    // Find the admin by username
    const patient = await PatientP.findOne({ username:username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const updatePasswordPatient = async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;
    const patient = await PatientP.findOne({ username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, patient.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid current password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await PatientP.updateOne(
      {
        username: username,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    await patient.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Error updating password' });
  }
};


module.exports={createPatientP, getPatientsP, deletePatientP, getPatientByUsername, getPatientP, updatePasswordPatient}