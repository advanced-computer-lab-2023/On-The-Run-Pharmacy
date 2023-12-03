
const { default: mongoose } = require('mongoose');

const Medicine = require('../models/MedicineModel');
const multer = require('multer');
const Sales = require('../models/SalesModel');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addMedicine = async (req, res) => {
  try {
    upload.single('picture')(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      console.log('Request Body:', req.body);

      const { name, description, available_quantity, medicalUse, price } = req.body;

      // Check if req.file.buffer exists and assign it to pictureUrl, otherwise handle it accordingly
      const pictureUrl = req.file
        ? `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
        : null;

      const medicine = new Medicine({
        name,
        description,
        available_quantity,
        medicalUse,
        price,
        pictureUrl,
      });

      await medicine.save();
      res.status(201).json(medicine);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getMedicinesWithSales = async (req, res) => {
  try {
    const medicines = await Medicine.find({ sales: { $gt: 0 } }).exec();

    if (!medicines.length) {
      return res.status(404).json({ message: 'No medicines found with sales greater than 0' });
    }

    res.status(200).json(medicines);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




const getMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findById(id).exec();

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json(medicine);
  } catch (error) {
    console.error('Error fetching medicine by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMedicine = await Medicine.findByIdAndDelete(id);
    if (!deletedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the medicine' });
  }
};
const getMedicines=async(req,res) =>{
  const patients =await Medicine.find({}).sort({createdAt:-1});
      for(let index=0;index<patients.length;index++){
         const element = [patients][index];
         //console.log(element.id);
      }
      res.status(200).json(patients)
};

const updateMedicine = async (req, res) => {
  try {
    const { id, medicalUse, description, price, available_quantity } = req.params;
    let update = {};
    if (medicalUse) update.medicalUse = medicalUse;
    if (description) update.description = description;
    if (price) update.price = price;
    if (available_quantity) update.available_quantity = available_quantity;

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      update,
      { new: true }
    );
    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the medicine' });
  }
};

const updateMedQuantity = async (req, res) => {
  const { id, amount } = req.params;
  const amountNumber = Number(amount);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid medicine ID' });
  }

  try {
    const medicine = await Medicine.findOne({ _id: id });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    if (medicine.available_quantity >= amountNumber) {
      medicine.available_quantity -= amountNumber;
      medicine.sales += amountNumber;
      try {
        const newSales = new Sales({
          medicineId: id,
          amount,
        });
    
        await newSales.save();
        await medicine.save();
    
        res.status(200).json({ message: 'Sales registered and medicine quantity updated successfully' });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while registering the Sales' });
      }
    } else {
      res.status(500).json({ error: 'Medicine not available in this quantity' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting the medicine quantity', details: error.message });
    }
};


module.exports = { addMedicine, getMedicine, deleteMedicine, updateMedicine ,getMedicines,updateMedQuantity,getMedicinesWithSales};