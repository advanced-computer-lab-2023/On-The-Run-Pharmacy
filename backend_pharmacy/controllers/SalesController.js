const mongoose = require('mongoose');
const Sales= require('../models/SalesModel');

const createSales = async (req, res) => {
  try {
    const { id, amount } = req.params;


    const newSales = new Sales({
      id,
      amount,
    });

    await newSales.save();

    res.status(201).json({ message: 'Sales registered successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while registering the Sales' });
  }
}

const getSales = async (req, res) => {
    try {
      const sales = await Sales.find().populate('medicineId');
      res.status(200).json(sales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the sales' });
    }
  }
  
  module.exports = { createSales, getSales };