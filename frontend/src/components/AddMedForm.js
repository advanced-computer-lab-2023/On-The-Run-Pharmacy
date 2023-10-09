import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMedicineForm = ({ onMedicineAdded }) => {
    const[name,setName]=useState('')
    const[description,setDescription]=useState('')
    const[available_quantity,setAvailable_quantity]=useState('')
    const[price,setPrice]=useState('')
    const[medicalUse,setMedicalUse]=useState('')
    const navigate = useNavigate();


  

  const handleSubmit = async (e) => {
    
    const m={name,description,available_quantity,price,medicalUse}
    e.preventDefault();

    try {
      // Make a POST request to add the medicine
      const response = await axios.post('http://localhost:4000/addMedicine', m);

      // Check if the request was successful
      if (response.status === 201) {
        // Call the callback function to notify the parent component
        // that a medicine has been added
        onMedicineAdded(response.data);

        // Clear the form data or reset the state as needed
       setName('')
       setDescription('')
       setAvailable_quantity('')
       setPrice('')
       setMedicalUse('')
       navigate('/getMedicines')
      }
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  return (
    <div>
      <h2>Add Medicine</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Medicine Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description:</label>
          <input
            type="text"
            id="desc"
            name="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="availableQuantity">Available Quantity:</label>
          <input
            type="number"
            id="availableQuantity"
            name="availableQuantity"
            value={available_quantity}
            onChange={(e)=>setAvailable_quantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicalUse">Medical Use:</label>
          <input
            type="text"
            id="medicalUse"
            name="medicalUse"
            value={medicalUse}
            onChange={(e)=>setMedicalUse(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicineForm;
