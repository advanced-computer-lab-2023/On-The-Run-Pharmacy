import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import PatientDetailsModal from '../components/PatientDetailsModal'
import { useNavigate } from 'react-router-dom';

//import './MedicineList.css'; // Import your CSS file for styling

const PatientListPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [patient, setPatient] = useState("");
  const [activePatinetId, setActivePatientId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getPatients`,{
        withCredentials: true
      });

      if (response.status === 200) {
        setPatients(response.data);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);
  const handleDelete = async (patientId) => {
    try {
      // Make a DELETE request to the backend to delete the patient
      await axios.delete(`http://localhost:4000/deletePatient/${patientId}`,{
        withCredentials: true
      });

      // After successful deletion, refresh the patient list by re-fetching
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="container">
    <button
        className="btn btn-primary mb-1"
        style={{
          backgroundColor: '#14967f',
          borderColor: '#14967f',
          transition: 'none',
          cursor: 'pointer',
          position: 'absolute',
          top: '75px', // Adjust this value based on your navbar height
          left: '10px',
          marginTop: '10px', // Added margin-top
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#14967f')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#14967f')}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="patients-list">
      <h2 style={{ textAlign: 'left' }}>All Patients</h2>


        {loading || isDeleting ? (
          <div className="spinner-container">
            <BeatLoader color="#14967f" size={15} />
          </div>
        ) : patients.length === 0 ? (
          <p>No patinets found</p>
        ) : (
          <ul className="patients-list">
            {patients.map((m) => (

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
                        setPatient(m);
                        setActivePatientId(m._id)
                        
                      }}
                    />
                    <FontAwesomeIcon
                      className="delete-icon"
                      icon={faTrash}
                      style={{ marginLeft: '10px' }}
                      onClick={() => {
                        setIsConfirmModalOpen(true);
                        setPatient(m);
                        setActivePatientId(m._id)
                        
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
      {modalOpen && patient &&
        <PatientDetailsModal
          setOpenModal={setModalOpen}
          patient={patient}
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
        <p style={{ color: '#555', marginBottom: '30px' }}>Are you sure you want to delete this doctor?</p>
       
        <div>
          <button style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: 'crimson', color: '#fff', border: 'none', borderRadius: '5px' }} onClick={() => {
            handleDelete(activePatinetId);
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

export default PatientListPage;
