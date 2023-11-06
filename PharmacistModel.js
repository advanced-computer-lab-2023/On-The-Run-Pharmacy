
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const PharmacistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  hourly_rate: {
    type: Number,
    required: true,
  },
  affiliation: {
    type:String,
    required:true,
  },
  educational_background:{
    type:String,
    required:true,
  },
  Working_license:{
    filename: String,
    path: String,
    mimetype: String,
    data: Buffer
  },
  Pharmacy_degree:{
    filename: String,
    path: String,
    mimetype: String,
    data: Buffer
  },
  Pharmacy_ID:{
    filename: String,
    path: String,
    mimetype: String,
    data: Buffer
  },
 
});

// Hash the password before saving to the database
PharmacistSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const saltRounds = 10; // Salt rounds for bcrypt
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const Pharmacist = mongoose.model('Pharmacist', PharmacistSchema);

module.exports = Pharmacist;