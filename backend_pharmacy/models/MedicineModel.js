
const mongoose = require('mongoose');


const MedicineSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required:true,
    
    
  },
  picture: {
    data: Buffer,
    contentType: String,

    
    
    
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
    default:0

    
    
  },
  medicalUse:{
    type: String,
    required:true, 
  }
 
});



const Medicine = mongoose.model("Medicine", MedicineSchema);

module.exports = Medicine;