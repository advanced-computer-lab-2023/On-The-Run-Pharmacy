import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { FaShoppingCart } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faCapsules } from '@fortawesome/free-solid-svg-icons'


//aaaaa
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
    <FontAwesomeIcon icon={faCapsules} style={{ height: '35px', marginRight: '5px', marginBottom: '10px' }} />
    <h1 style={{ fontSize: '25px', fontWeight: '600', color: 'White', marginBottom: '10px' }}>On-The-Run</h1>
  </Link>
</div>
    <div className="right-container">
      {user && (
        <div>
          <FontAwesomeIcon icon={faUser} style={{ color: 'White', stroke: 'white', strokeWidth: '2' }} />
          <h3> {user.user}</h3>
          {user.role === 'pharmacist' && (
            <Link to={`/doctorSettings/${user.user}`}>
              <FontAwesomeIcon icon={faCog} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
            </Link>
          )}
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
           {user.role === 'admin' && (
            <Link to={`/adminSettings/${user.user}`}>
              <FontAwesomeIcon icon={faCog} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
            </Link>
          )}
          { (user.role === 'pharmacist' || user.role === 'patient') && 
  <Link to={`/notifications/${user.user}`} className="notification-icon">
    <FaBell />
  </Link>
}
{(user.role === 'admin'|| user.role ==='pharmacist') && (
  <Link to="/sales"> <FontAwesomeIcon icon={faChartSimple} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
  </Link>
)}

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

export default Navbar