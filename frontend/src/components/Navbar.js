import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { FaShoppingCart } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
// ... (your other import statements)
import { FaComments } from 'react-icons/fa';
import { FaWallet } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axio
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [patientUsername, setPatientUsername] = useState('');
  const [doctorUsername, setDoctorUsername] = useState('');
  
  const handlePatientInputChange = (e) => {
    setPatientUsername(e.target.value);
  };
  
  const handleDoctorInputChange = (e) => {
    setDoctorUsername(e.target.value);
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);
  
  const handleOpenModal = async () => {
    // Fetch pharmacists here using your getPharmacists function
    try {
      const response = await axios.get('http://localhost:4000/getPharmacists2');
      setPharmacists(response.data);
    } catch (error) {
      console.error('Error fetching pharmacists:', error);
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStartChat = () => {
    // Redirect to chat page with the selected pharmacist
    // Replace '/chat' with your actual chat route
    // Replace 'selectedPharmacist' with the selected pharmacist username
    navigate(`/chat/${user.user}/${selectedPharmacist}`) ; 
  };
  const handleClick = () => {
    logout()
    
  }
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getWallet/${user.user}`, {
          withCredentials: true,
        });
        setWallet(response.data);
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };

    if (user && user.role === 'patient') {
      fetchWallet();  // Fetch wallet only for patient users
    }
  }, [user]); 
return (
  <header>
    <div className="left-container">
      <Link to="/" style={{ display: 'flex', alignItems: 'flex-end' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ height: '50px', marginRight: '5px', marginBottom: '10px' }}>
          <title>doctor</title>
          <g id="doctor">
            <path fill="#FFFFFF" d="M21.14,14A6.45,6.45,0,0,0,23,9.5V4.43A2.43,2.43,0,0,0,20.57,2H12.43A2.43,2.43,0,0,0,10,4.43V9.5A6.49,6.49,0,0,0,11.82,14h-.09A8.73,8.73,0,0,0,3,22.73v3.74A3.53,3.53,0,0,0,6.53,30H25.47A3.53,3.53,0,0,0,29,26.47V22.73A8.74,8.74,0,0,0,21.14,14ZM12.43,4h8.14a.43.43,0,0,1,.43.43V8H12V4.43A.43.43,0,0,1,12.43,4Zm-.38,6H21a4.48,4.48,0,0,1-8.9,0ZM11,21a1,1,0,1,1-1,1A1,1,0,0,1,11,21Zm16,5.47A1.54,1.54,0,0,1,25.47,28H6.53A1.54,1.54,0,0,1,5,26.47V22.73a6.75,6.75,0,0,1,5-6.5v2.95a3,3,0,1,0,2,0V16h8v3.18A3,3,0,0,0,18,22v2a1,1,0,0,0,2,0V22a1,1,0,0,1,2,0v2a1,1,0,0,0,2,0V22a3,3,0,0,0-2-2.82V16.23a6.75,6.75,0,0,1,5,6.5ZM14,6a1,1,0,0,1,1-1h3a1,1,0,0,1,0,2H15A1,1,0,0,1,14,6Z" />
          </g>
        </svg>
        <h1 style={{ fontSize: '25px', fontWeight: '600', color: 'White', marginBottom: '10px' }}>On-The-Run</h1>
      </Link>
      {user && (
          <div className="chat-container">
            <label style={{ marginBottom: '10px' }}>
              Patient's Username:
              <input
                type="text"
                value={patientUsername}
                onChange={handlePatientInputChange}
                style={{ width: '100px' }}
              />
            </label>
            <button
              style={{ marginLeft: '10px', marginBottom: '10px', padding: '5px 10px' }}
              onClick={() => console.log(`Start chat with ${patientUsername}`)}
            >
              Start Chat with Patient
            </button>

            <label style={{ marginBottom: '10px' }}>
              Doctor's Username:
              <input
                type="text"
                value={doctorUsername}
                onChange={handleDoctorInputChange}
                style={{ width: '100px' }}
              />
            </label>
            <button
              style={{ marginLeft: '10px', padding: '5px 10px' }}
              onClick={() => console.log(`Start chat with ${doctorUsername}`)}
            >
              Start Chat with Doctor
            </button>
          </div>
        )}

    </div>
    <div className="right-container">
        {user && (
          <div>
            <FontAwesomeIcon icon={faUser} style={{ color: 'White', stroke: 'white', strokeWidth: '2' }} />
            <h3> {user.user}</h3>
            {user.role === 'pharmacist' && (
              <Link to={`/PharmacistSettings/${user.user}`}>
                <FontAwesomeIcon icon={faCog} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
              </Link>
            )}
            {user.role === 'patient' && (
              <Link to={`/patientSettings/${user.user}`}>
                <FontAwesomeIcon icon={faCog} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
              </Link>
            )}
            {user.role === 'admin' && (
              <Link to={`/adminSettings/${user.user}`}>
                <FontAwesomeIcon icon={faCog} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
              </Link>
            )}
            <Link to={`/notifications/${user.user}`} className="notification-icon">
              <FaBell />
            </Link>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/register/pharmacist" className="signup-link">
              Signup as Pharmacist
            </Link>
            <Link to="/register/patient" className="signup-link">
              Signup as Patient
            </Link>
          </div>
        )}
 
      </div>
        {user.role === 'patient' && (
  <div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <button onClick={handleOpenModal}>
      {/* Chat icon */}
      <FaComments style={{ color: 'White', marginLeft: '0' }} />
    </button>
  </div>
    
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Link to={`/CurrentOrders/${user.user}`}>
        {/* Button for Orders page */}
        <button style={{ marginLeft: '0', border: 'none', background: 'none' }}>My Orders</button>
      </Link>
    </div>

    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/wallet"> {/* Update the route accordingly */}
        {/* Wallet icon with the wallet amount */}
        <FaWallet style={{ color: 'White', marginLeft: '10px' }} />
        {/* Display the wallet amount (replace '100' with the actual wallet amount) */}
        <span style={{ color: 'White', marginLeft: '5px' }}>${wallet}</span>
      </Link>
    </div>

    <Link to={`/cart/${user.user}`}>
      {/* Icon for Cart */}
      <FaShoppingCart style={{ color: 'White', marginLeft: '10px' }} />
    </Link>

    <Link to={`/patientSettings/${user.user}`}>
      {/* Settings icon for patient */}
      <FontAwesomeIcon icon={faCog} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
    </Link>
  </div>
)}
<div>
           {user.role === 'admin' && (
            <Link to={`/adminSettings/${user.user}`}>
              <FontAwesomeIcon icon={faCog} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
            </Link>
          )}
          <Link to={user.role === 'admin' ? `/sales` : `/notifications/${user.user}`} className="notification-icon">
              <FaBell />
            </Link>
          <button onClick={handleClick}>Log out</button>
        </div>
      {!user && (
        <div>
          <Link to="/register/pharmacist" className="signup-link">
            Signup as Pharmacist
          </Link>
          <Link to="/register/patient" className="signup-link">
            Signup as Patient
          </Link>
        </div>
      )}
{/* ... (modal code) */}
<Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a Pharmacist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="pharmacistDropdown">
            <Form.Label>Select Pharmacist</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedPharmacist(e.target.value)}>
              <option value="">Select Pharmacist</option>
              {pharmacists.map((pharmacist) => (
                <option key={pharmacist.username} value={pharmacist.username}>
                  {pharmacist.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleStartChat(); handleCloseModal(); }} disabled={!selectedPharmacist}>
  Start Chat
</Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};
}
export default Navbar;