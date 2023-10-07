
const mongoose = require('mongoose');


const MedicineSchema = new mongoose.Schema({
 
  name: {
    type: String,
    
    
    
  },
  picture: {
    data: Buffer,
    contentType: String,
    
    
    
  },
  description: {
    type: String,
    
    
  },
  available_quantity: {
    type: Number,
    
    
  },
  sales:{
    type:Number,    
    
    
  },
 
});



const Medicine = mongoose.model("Medicine", MedicineSchema);

module.exports = Medicine;