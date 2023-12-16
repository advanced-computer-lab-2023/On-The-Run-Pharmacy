import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const MedicineModal = ({ setOpenModal, medicineId }) => {
    const [MedicineDetails, setMedicineDetails] = useState([]);

    useEffect(() => {
        const fetchMedicineDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/getMed/${medicineId}`, { withCredentials: true });
                setMedicineDetails(response.data);
            } catch (error) {
                console.error('Error fetching medicine details:', error);
            }
        };

        fetchMedicineDetails();
    }, [medicineId]);

    return (
        <div className="modalBackground">
            <div className="modalContainer" style={{ width: '80%', maxWidth: '800px', height: '80%' }}>
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className='title' style={{ marginBottom: '20px' }}>
                    <h1>Medicine Details</h1>
                </div>
                <div className="metadata" style={{ fontSize: '20px', display: 'flex' }}>
                    <div style={{ flex: 1, marginRight: '20px' , marginTop : "85px" }}>
                        <p style={{ marginBottom: '20px' }}><strong>Name:</strong> {MedicineDetails.name}</p>
                        <p style={{ marginBottom: '20px' }}><strong>Description:</strong> {MedicineDetails.description}</p>
                        <p style={{ marginBottom: '20px' }}><strong>Price:</strong> {MedicineDetails.price}</p>
                        <p style={{ marginBottom: '20px' }}><strong>Available Quantity:</strong> {MedicineDetails.available_quantity}</p>
                        <p style={{ marginBottom: '20px' }}><strong>Medical Use:</strong> {MedicineDetails.medicalUse}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                        <img
                            src={MedicineDetails.pictureUrl}
                            alt={MedicineDetails.name}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineModal;
