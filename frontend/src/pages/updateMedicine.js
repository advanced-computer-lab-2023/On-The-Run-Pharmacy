import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useNavigate,useParams } from 'react-router-dom';

const UpdatedMedicine = () => {
    const navigate = useNavigate();
    const { medicineId,username } = useParams();
    const [medicalUse, setMedicalUse] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [available_quantity, setavailable_quantity] = useState('');
   

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a PUT request to update the medicine with the new description and price
      const response = await axios.put(`http://localhost:4000/updateMed/${medicineId}/${medicalUse}/${description}/${price}/${available_quantity}`);
      // Check if the request was successful
      if (response.status === 200) {
        // Handle success (e.g., show a success message)
        console.log('Medicine updated successfully');
        navigate(`/getMedicines/pharmacist/${username}`)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="medicalUse">Medical Use:</label>
            <input
              type="text"
              id="medicalUse"
              name="medicalUse"
              value={medicalUse}
              style={{ width: '400px', height: '30px', padding: '8px', fontSize: '14px' }}
              onChange={(e) => setMedicalUse(e.target.value)}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              style={{ width: '400px', height: '30px', padding: '8px', fontSize: '14px' }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              style={{ width: '400px', height: '30px', padding: '8px', fontSize: '14px' }}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="available_quantity">available_quantity:</label>
            <input
              type="number"
              id="available_quantity"
              name="available_quantity"
              value={available_quantity}
              style={{ width: '400px', height: '30px', padding: '8px', fontSize: '14px' }}
              onChange={(e) => setavailable_quantity(e.target.value)}
            />
          </div>
  
          <button type="submit" style={{ borderRadius: '20px', // Adjust the radius as needed for the desired roundness
                           backgroundColor: 'transparent', // No background color (transparent)
                           border: '2px solid #4CAF50', // Green border for Archive
                           color: '#4CAF50', // Green text color
                           padding: '10px 20px',
                           textAlign: 'center',
                           textDecoration: 'none',
                           display: 'inline-block',
                           fontSize: '14px',
                           margin: '4px 2px',
                           cursor: 'pointer'}}>Update Medicine</button>
        </form>
      </div>
    );
  };
  
  export default UpdatedMedicine;

