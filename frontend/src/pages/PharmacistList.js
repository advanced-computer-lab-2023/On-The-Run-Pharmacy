import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import PharmacistDetailsModal from '../components/PharmacistDetailsModal';
import { useNavigate } from 'react-router-dom';

import './MedicineList.css'; // Import your CSS file for styling

const PharmacistListPage = () => {
  const [pharmacist, setPharmacist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [pharmacist1, setpharmacist1] = useState("");
  const [activeDoctorId, setActiveDoctorId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const navigate=useNavigate();

  const fetchPharmacists = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getPharmacist`,{
        withCredentials: true
      });

      if (response.status === 200) {
        setPharmacist(response.data);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacists();
  }, []);
  const handleDelete = async (patientId) => {
    try {
      // Make a DELETE request to the backend to delete the patient
      await axios.delete(`http://localhost:4000/deletePharmacist/${patientId}`,{
        withCredentials: true
      });

      // After successful deletion, refresh the patient list by re-fetching
      fetchPharmacists();
    } catch (error) {
      console.error('Error deleting pharma:', error);
    }
  };


return (
  <div className="container">
     <div className="form1-group">
      <button type="submit" onClick={() => navigate(-1)}>Back</button>                </div>  
    <div className="patients-list">
    <h2 style={{ textAlign: 'left' }}>All Pharmacists</h2>

      {loading || isDeleting ? (
        <div className="spinner-container">
          <BeatLoader color="#14967f" size={15} />
        </div>
      ) : pharmacist.length === 0 ? (
        <p>No pharmacists found</p>
      ) : (
        <ul className="patients-list">
          {pharmacist.map((m) => (

            <li key={m._id}>
              <div className="patients-header">
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <strong>Username: </strong>{m.username}
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <strong>ID: </strong>{m._id}
                </div>
                <div style={{ flex: 1, textAlign: 'right', marginRight: '10px' }}>
                  <FontAwesomeIcon
                    className="view-icon"
                    icon={faEye}
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      setModalOpen(true);
                      setpharmacist1(m);
                      setActiveDoctorId(m._id)
                      
                    }}
                  />
                  <FontAwesomeIcon
                    className="delete-icon"
                    icon={faTrash}
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      setIsConfirmModalOpen(true)
                      setpharmacist1(m);
                      setActiveDoctorId(m._id)
                      }

                    }
                      
                  />
                </div>
              </div>
            </li>

          ))}
        </ul>

      )}
    </div>
    {modalOpen && pharmacist &&
      <PharmacistDetailsModal
        setOpenModal={setModalOpen}
        pharmacist={pharmacist1}
      />
    }
    <Modal
      isOpen={isConfirmModalOpen}
      onRequestClose={() => setIsConfirmModalOpen(false)}
      contentLabel="Confirm Delete"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#f4f4f4',
          borderRadius: '10px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Confirm Delete</h2>
      <p style={{ color: '#555', marginBottom: '30px' }}>Are you sure you want to delete {pharmacist1.username}?</p>
     
      <div>
        <button style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: 'crimson', color: '#fff', border: 'none', borderRadius: '5px' }} onClick={() => {
          handleDelete(activeDoctorId);
          setIsConfirmModalOpen(false);
        }}>
          Yes
        </button>
        <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: '#fff', border: 'none', borderRadius: '5px' }} onClick={() => setIsConfirmModalOpen(false)}>
          No
        </button>
      </div>
    </Modal>
  </div >
);
};

export default PharmacistListPage;
