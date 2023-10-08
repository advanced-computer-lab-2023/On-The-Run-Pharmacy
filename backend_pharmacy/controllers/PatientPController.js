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
        const patient = await userModel.findOne({username : username });
  
      res.status(200).json(patient);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'An error occurred while retrieving the Patient' });
    }
  };

  const deletePatientP = async (req, res) => {
    const { username } =  req.body;
 
    try {
       // Delete the pharmacist with the specified username
       const deletedUser = await userModel.findOneAndDelete({ username });
 
       if (!deletedUser) {
          return res.status(404).json({ message: 'Patient not found' });
       }
 
       return res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'An error occurred while deleting the Patient' });
    }
 };


module.exports={createPatientP, getPatientsP, deletePatientP, getPatientP}