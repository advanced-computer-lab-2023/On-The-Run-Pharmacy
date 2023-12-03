
const mongoose = require('mongoose');


const MedicineSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required:true,
 
  },
  pictureUrl: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required:true,
    
    
  },
  available_quantity: {
    type: Number,
    required:true,
    
    
  },
  sales:{
    type:Number,   
    default:0,
    required:false,    
  },
  medicalUse:{
    type: String,
    required:true, 
  },
  price:{
    type:Number,
    required:true
  },
  type:{
    type: String,
    enum: ['Over the counter', 'Prescription only'],
    required: false,
  },
 
});



const Medicine = mongoose.model("Medicine", MedicineSchema);

module.exports = Medicine;