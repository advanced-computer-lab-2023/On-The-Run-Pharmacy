
const { default: mongoose } = require('mongoose');

const Medicine = require('../models/MedicineModel');
const multer = require('multer');

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
        statuss: 'Unarchived',
      });

      await medicine.save();
      res.status(201).json(medicine);
    });
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
const getMedicines2=async(req,res) =>{
  const patients = await Medicine.find({ statuss: 'Unarchived' }).sort({ createdAt: -1 });
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

const archiveMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the medicine by ID
    const medicine = await Medicine.findById(id);

    // Check if the medicine exists
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Set the status to "archived"
    medicine.statuss = 'archived';

    // Save the updated medicine
const updatedMedicine = await medicine.save();



    // Respond with the archived medicine
    res.status(200).json({ message: 'Medicine archived successfully', medicine });
  } catch (error) {
    console.error('Error archiving medicine:', error);
    res.status(500).json({ error: 'An error occurred while archiving the medicine' });
  }
};

const unarchiveMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the medicine by ID
    const medicine = await Medicine.findById(id);

    // Check if the medicine exists
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Set the status to "unarchived"
    medicine.statuss = 'Unarchived';

    // Save the updated medicine
    await medicine.save();

    // Respond with the unarchived medicine
    res.status(200).json({ message: 'Medicine unarchived successfully', medicine });
  } catch (error) {
    console.error('Error unarchiving medicine:', error);
    res.status(500).json({ error: 'An error occurred while unarchiving the medicine' });
  }
};
const getAlternativeMedicines = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the medicine by ID
    const medicine = await Medicine.findById(id);

    // Check if the medicine exists
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Get the active ingredient of the current medicine
    const activeIngredient = medicine.activeIngredient;

    // Find alternative medicines with the same active ingredient
    const alternativeMedicines = await Medicine.find({
      _id: { $ne: id }, // Exclude the current medicine from the results
      activeIngredient,
      statuss: 'Unarchived', // You may want to consider the status of medicines
    });

    res.status(200).json({ alternativeMedicines });
  } catch (error) {
    console.error('Error fetching alternative medicines:', error);
    res.status(500).json({ error: 'An error occurred while fetching alternative medicines' });
  }
};

module.exports = { addMedicine, getMedicine, deleteMedicine, updateMedicine ,getMedicines,getMedicines2,archiveMedicine,unarchiveMedicine,getAlternativeMedicines };