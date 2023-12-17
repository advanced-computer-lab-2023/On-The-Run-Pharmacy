// AlternativeMedicinesPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeatLoader from "react-spinners/BeatLoader";
import { faEye } from '@fortawesome/free-solid-svg-icons';

const AlternativeMedicinesPage = () => {
  const { medicineId } = useParams();
  const navigate = useNavigate();
  const [alternativeMedicines, setAlternativeMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState({});

  useEffect(() => {
    const fetchAlternativeMedicines = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getAlternativeMedicines/${medicineId}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setAlternativeMedicines(response.data.alternativeMedicines);
        }
      } catch (error) {
        console.error('Error fetching alternative medicines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlternativeMedicines();
  }, [medicineId]);

  const handleOpenModal = (medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMedicine({});
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="patients-list">
        <h2>Alternative Medicines</h2>
        {loading ? (
          <div className="spinner-container">
            <BeatLoader color="#14967f" size={15} />
          </div>
        ) : alternativeMedicines.length === 0 ? (
          <p>No alternative medicines found</p>
        ) : (
          <ul className="patients-list">
            {alternativeMedicines.map((medicine) => (
              <li key={medicine._id}>
                <div className="patients-header">
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <strong>Medicine Name: </strong>{medicine.name}
                  </div>
                  <div style={{ flex: 1, textAlign: 'right', marginRight: '10px' }}>
                    <FontAwesomeIcon
                      icon={faEye}
                      color="#14967f"
                      onClick={() => handleOpenModal(medicine)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '300px' }}>
            <div style={{ marginBottom: '10px' }}><h2>Medicine Details</h2></div>
            <div style={{ marginBottom: '10px' }}><p><strong>Name:</strong> {selectedMedicine.name}</p></div>
            <div style={{ marginBottom: '10px' }}><p><strong>Description:</strong> {selectedMedicine.description}</p></div>
            <div style={{ marginBottom: '10px' }}><p><strong>Medical Use:</strong> {selectedMedicine.medicalUse}</p></div>
            <div style={{ marginBottom: '10px' }}><p><strong>Active Ingredient:</strong> {selectedMedicine.activeIngredient}</p></div>
            <div style={{ marginBottom: '10px' }}><p><strong>Price:</strong> {selectedMedicine.price}</p></div>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      <div className="back-button-container">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          style={{ backgroundColor: '#2060a4', color: '#fff', position: 'absolute' }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AlternativeMedicinesPage;
