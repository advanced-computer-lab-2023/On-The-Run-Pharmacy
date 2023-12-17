
const { default: mongoose } = require('mongoose');

const Medicine = require('../models/MedicineModel');
const multer = require('multer');
const Sales = require('../models/SalesModel');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const nodemailer = require('nodemailer');
const Pharmacist = require('../models/PharmacistModel');
const Notification = require('../models/PNotificationModel');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ontherunpharmacy@gmail.com', // Replace with your email
    pass:'uqor aqrq wscq raph',
    //pass: 'mohd1963', // Replace with your email password or an app-specific password
  },
});

const sendEmailNotification = async (subject, text) => {
  try {
    const pharmacists = await Pharmacist.find({}, 'email');

    if (pharmacists.length === 0) {
      console.warn('No pharmacists found to send email notification.');
      return;
    }

    const emailAddresses = pharmacists.map((pharmacist) => pharmacist.email);

    for (const email of emailAddresses) {
      const mailOptions = {
        from: 'ontherunpharmacy@hotmail.com',
        to: email, // Set the current pharmacist's email address
        subject: subject,
        text: text,
      };
      await transporter.sendMail(mailOptions);
    }
   
    console.log('Email notification sent to pharmacists.');
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};

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
const getMedicines2=async(req,res) =>{
  const patients = await Medicine.find({ statuss: {$ne: 'Archived'} }).sort({ createdAt: -1 });
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

      // Check if the medicine is out of stock
      if (medicine.available_quantity === 0) {
        const notification = new Notification({
          medicineId: id,
          medicineName: medicine.name,
        });

        await notification.save();

        // Send email notification to pharmacists
        const subject = 'Medicine Out of Stock Notification';
        const text = `The medicine ${medicine.name} is out of stock. Please update the inventory.`;

        try {
          const pharmacists = await Pharmacist.find({}, 'email');

          if (pharmacists.length === 0) {
            console.warn('No pharmacists found to send email notification.');
            return res.status(200).json({
              message: 'Sales registered and medicine quantity updated successfully, but no pharmacists found to notify',
            });
          }

          const emailAddresses = pharmacists.map((pharmacist) => pharmacist.email);

          for (const email of emailAddresses) {
            const mailOptions = {
              from: 'ontherunpharmacy@gmail.com',
              to: email,
              subject: subject,
              text: text,
            };

            try {
              // Ensure you log the email sending step to identify any issues
              console.log(`Sending email to ${email}`);
              await transporter.sendMail(mailOptions);
              console.log(`Email sent successfully to ${email}`);
            } catch (error) {
              console.error(`Error sending email to ${email}:`, error);
            }
          }

          console.log('Email notification sent to pharmacists.');
        } catch (error) {
          console.error('Error fetching pharmacists:', error);
          // Handle error fetching pharmacists
        }
      }

      // Save changes to the database
      try {
        const newSales = new Sales({
          medicineId: id,
          amount,
        });

        await newSales.save();
        await medicine.save();

        res.status(200).json({
          message: 'Sales registered and medicine quantity updated successfully',
        });
      } catch (error) {
        console.error('Error saving changes to the database:', error);
        res
          .status(500)
          .json({ error: 'An error occurred while registering the Sales' });
      }
    } else {
      res.status(500).json({
        error: 'Medicine not available in this quantity',
      });
    }
  } catch (error) {
    console.error('Error fetching the medicine from the database:', error);
    res.status(500).json({
      error: 'An error occurred while getting the medicine quantity',
      details: error.message,
    });
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

    // Get the medical use of the current medicine
    const medicalUse = medicine.medicalUse;

    // Find alternative medicines with the same medical use
    const alternativeMedicines = await Medicine.find({
      _id: { $ne: id }, // Exclude the current medicine from the results
      medicalUse,
      statuss: { $ne: 'Archived' }, // You may want to consider the status of medicines
    });

    // Wrap the alternativeMedicines array in square brackets before sending the response
    res.status(200).json({ alternativeMedicines: [ ...alternativeMedicines ] });
    
  } catch (error) {
    console.error('Error fetching alternative medicines:', error);
    res.status(500).json({ error: 'An error occurred while fetching alternative medicines' });
  }
};


const getOutOfStockMedicines = async (req, res) => {
  try {
    const outOfStockMedicines = await Medicine.find({ available_quantity: 0 });

    if (outOfStockMedicines.length === 0) {
      return res.status(200).json({ message: 'No out-of-stock medicines found' });
    }

    const pharmacists = await Pharmacist.find({}, 'email');

    if (pharmacists.length === 0) {
      console.warn('No pharmacists found to send email notification.');
      return res.status(200).json({ message: 'No pharmacists found to notify' });
    }

    const emailAddresses = pharmacists.map((pharmacist) => pharmacist.email);
    
    // Iterate through outOfStockMedicines and send email notifications to pharmacists
    for (const medicine of outOfStockMedicines) {
      const notification = new Notification({
        medicineId: medicine._id,
        medicineName: medicine.name,
      });

      await notification.save();

      // Send email notification to pharmacists
      const subject = 'Medicine Out of Stock Notification';
      const text = `The medicine ${medicine.name} is out of stock. Please update the inventory.`;

      try {
        for (const email of emailAddresses) {
          const mailOptions = {
            from: 'ontherunpharmacy@hotmail.com',
            to: email, // Set the current pharmacist's email address
            subject: subject,
            text: text,
          };

          await transporter.sendMail(mailOptions);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'An error occurred while sending email' });
      }
      //await sendEmailNotification(subject, text);
    }

    res.status(200).json({ message: 'Out-of-stock medicines processed successfully' });
  } catch (error) {
    console.error('Error fetching and processing out-of-stock medicines:', error);
    res.status(500).json({ error: 'An error occurred while processing out-of-stock medicines' });
  }
};


module.exports = { addMedicine, getMedicine, deleteMedicine, updateMedicine ,getMedicines,updateMedQuantity,getMedicinesWithSales,getOutOfStockMedicines,getAlternativeMedicines,unarchiveMedicine,archiveMedicine,getMedicines2};
