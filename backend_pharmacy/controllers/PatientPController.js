const PatientP = require('../models/PatientPModel');
const Medicine = require('../models/MedicineModel');


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
 const addToCart = async (req, res) => {
  const { username, medicineId, amount } = req.body;
  

  try {
    const patient = await PatientP.findOne({ username });
    const medicine = await Medicine.findById(medicineId);

    if (!patient || !medicine) {
      return res.status(404).json({ message: 'Patient or medicine not found' });
    }
    const cartItemIndex = patient.cart.findIndex(item => item.medicine_id.toString() === medicineId);
    if (cartItemIndex > -1) {
      // Medicine already exists in the cart, increment the amount
      patient.cart[cartItemIndex].quantity += amount;
    } else {
      // Medicine does not exist in the cart, add a new item
      const cartItem = {
        medicine_id: medicineId,
        quantity: amount,
        medicineName:medicine.name,
        price: medicine.price,
      };

      patient.cart.push(cartItem);
    }

    await patient.save();

    res.status(200).json({ message: 'Medicine added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the medicine to the cart' });
  }
};


module.exports={createPatientP, getPatientsP, deletePatientP, getPatientP,addToCart}