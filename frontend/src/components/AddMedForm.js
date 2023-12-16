import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCapsules, faInfo, faDollarSign, faBox, faHeartbeat, faImage } from '@fortawesome/free-solid-svg-icons';

const AddMedicineForm = ({ onMedicineAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [available_quantity, setAvailable_quantity] = useState('');
  const [price, setPrice] = useState('');
  const { username } = useParams();
  const [medicalUse, setMedicalUse] = useState('');
  const [picture, setPicture] = useState(null); // Store the selected image file
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('available_quantity', available_quantity);
    formData.append('price', price);
    formData.append('medicalUse', medicalUse);
    formData.append('picture', picture); // Append the selected image file

    try {
      // Make a POST request to add the medicine
      const response = await axios.post('http://localhost:4000/addMedicine', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });

      // Check if the request was successful
      if (response.status === 201) {
        // Clear the form data or reset the state as needed
        setName('');
        setDescription('');
        setAvailable_quantity('');
        setPrice('');
        setMedicalUse('');
        setPicture(null); // Reset the selected image file
        navigate(`/getMedicines/pharmacist/${username}`);
      }
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setPicture(selectedFile); // Store the selected image file as a Blob
    } else {
      // Handle the case where the user canceled the file selection
      console.log('File selection canceled');
    }
  };

  const handleBack = () => {
    navigate(`/getMedicines/pharmacist/${username}`);
  };

  return (
    <div>
      <h2>Add Medicine</h2>

      <form onSubmit={handleSubmit} className="medicine-form">
        <div className="form-group">
          <label htmlFor="name">
            <FontAwesomeIcon icon={faCapsules} />
            Medicine Name:
          </label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '400px', height: '30px', padding: '8px', fontSize: '14px' }} />
        </div>

        <div className="form-group">
          <label htmlFor="desc">
            <FontAwesomeIcon icon={faInfo} />
            Description:
          </label>
          <input type="text" id="desc" name="desc" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '400px', height: '30px', padding: '8px', fontSize: '14px' }} />

        </div>

        <div className="form-group">
          <label htmlFor="price">
            <FontAwesomeIcon icon={faDollarSign} />
            Price:
          </label>
          <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '400px', height: '30px', padding: '8px', fontSize: '14px' }} />

        </div>

        <div className="form-group">
          <label htmlFor="availableQuantity">
            <FontAwesomeIcon icon={faBox} />
            Available Quantity:
          </label>
          <input type="text" id="quan" name="quan" value={available_quantity} onChange={(e) => setAvailable_quantity(e.target.value)} style={{ width: '400px', height: '30px', padding: '8px', fontSize: '14px' }} />

        </div>

        <div className="form-group">
          <label htmlFor="medicalUse">
            <FontAwesomeIcon icon={faHeartbeat} />
            Medical Use:
          </label>
          <input type="text" id="use" name="use" value={medicalUse} onChange={(e) => setMedicalUse(e.target.value)} style={{ width: '400px', height: '30px', padding: '8px', fontSize: '14px' }} />

        </div>

        <div className="form-group">
          <label htmlFor="picture">
            <FontAwesomeIcon icon={faImage} />
            Medicine Image:
          </label>
          <input type="file" id="picture" name="picture" onChange={handleFileChange} required />
        </div>

        <button onClick={handleBack} className="back-button">
          Back
        </button>

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
                           cursor: 'pointer'}}>Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicineForm;
