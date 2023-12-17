import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { FaShoppingCart } from 'react-icons/fa';
import { FaBell ,FaTimes} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faCapsules } from '@fortawesome/free-solid-svg-icons'


import { FaComments ,FaUser,FaUserMd,FaList} from 'react-icons/fa';
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
  const [walletPharma, setWalletPharma] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);
  const [showOrdersTooltip, setShowOrdersTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showChatTooltip, setShowChatTooltip] = useState(false);
  const [chatTooltipPosition, setChatTooltipPosition] = useState({ x: 0, y: 0 });
  const [showChatTooltipP, setShowChatTooltipP] = useState(false);
  const [chatTooltipPositionP, setChatTooltipPositionP] = useState({ x: 0, y: 0 });
  const [showChatTooltipD, setShowChatTooltipD] = useState(false);
  const [chatTooltipPositionD, setChatTooltipPositionD] = useState({ x: 0, y: 0 });
  const [showSales, setShowSales] = useState(false);
  const [SalesPosition, setSalesPosition] = useState({ x: 0, y: 0 });


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

  const handleOpenPatientModal = async () => {
    try {
      const response = await axios.get('http://localhost:4000/getPatients2');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }

    setShowPatientModal(true);
  };

  const handleClosePatientModal = () => {
    setShowPatientModal(false);
  };
  const handleStartChatWithPatient = () => {
    // Handle starting a chat with the selected patient
    // You can replace this with your actual logic
    navigate(`/chat/${user.user}/${selectedPatient}`) ; 
  };

  const handleOpenDoctorModal = async () => {
    // Fetch doctors here using your getDoctors function
    try {
      const response = await axios.get('http://localhost:4000/getDoctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }

    setShowDoctorModal(true);
  };

  const handleCloseDoctorModal = () => {
    setShowDoctorModal(false);
  };

  const handleStartChatWithDoctor = () => {
    // Handle starting a chat with the selected doctor
    // You can replace this with your actual logic
    navigate(`/chat/${user.user}/${selectedDoctor}`) ; 
  };


  const handleClick = () => {
    logout()
    
  }

  const handleHoverOrders = (e) => {
    const tooltipX = e.clientX + 10; // Adjust the values as needed
    const tooltipY = e.clientY - 20; // Adjust the values as needed
    setTooltipPosition({ x: tooltipX, y: tooltipY });
    setShowOrdersTooltip(true);
  };

  const handleLeaveOrders = () => {
    setShowOrdersTooltip(false);
  };

  const handleHoverChat = (e) => {
    const tooltipX = e.clientX + 10; // Adjust the values as needed
    const tooltipY = e.clientY - 20; // Adjust the values as needed
    setChatTooltipPosition({ x: tooltipX, y: tooltipY });
    setShowChatTooltip(true);
  };

  const handleLeaveChat = () => {
    setShowChatTooltip(false);
  };

  const handleHoverChatP = (e) => {
    const tooltipX = e.clientX + 10; // Adjust the values as needed
    const tooltipY = e.clientY - 20; // Adjust the values as needed
    setChatTooltipPositionP({ x: tooltipX, y: tooltipY });
    setShowChatTooltipP(true);
  };

  const handleLeaveChatP = () => {
    setShowChatTooltipP(false);
  };
  const handleHoverChatD = (e) => {
    const tooltipX = e.clientX + 10; // Adjust the values as needed
    const tooltipY = e.clientY - 20; // Adjust the values as needed
    setChatTooltipPositionD({ x: tooltipX, y: tooltipY });
    setShowChatTooltipD(true);
  };

  const handleLeaveChatD = () => {
    setShowChatTooltipD(false);
  };

  const handleSales = (e) => {
    const tooltipX = e.clientX + 10; // Adjust the values as needed
    const tooltipY = e.clientY - 20; // Adjust the values as needed
    setSalesPosition({ x: tooltipX, y: tooltipY });
    setShowSales(true);
  };

  const handleLeaveSales = () => {
    setShowSales(false);
  };

  const fetchWalletpharma = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getPharmaWallet/${user.user}`,{
        withCredentials: true
      });
      setWalletPharma(response.data);
      console.log("pharmawallet",response.data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

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
    else if(user && user.role ==='pharmacist') {
      fetchWalletpharma();
    }
  },[user]); 
return (
  <header>
    <div className="left-container">
  <Link to="/" style={{ display: 'flex', alignItems: 'flex-end' }}>
    <FontAwesomeIcon icon={faCapsules} style={{ height: '35px', marginRight: '5px', marginBottom: '10px' }} />
    <h1 style={{ fontSize: '25px', fontWeight: '600', color: 'White', marginBottom: '10px' }}>On-The-Run</h1>
  </Link>
</div>
    <div className="right-container" >

    {user && user.role === 'pharmacist' && (
 <div style={{width:"520px", marginRight:"-30px"}}>
   {/* Button to start chat with a doctor */}
   <button onClick={handleOpenDoctorModal}
   style={{ width: '90px', height: '50px', display: 'flex', justifyContent: 'space-between' }} onMouseEnter={handleHoverChatD} onMouseLeave={handleLeaveChatD}>
   <FaComments style={{ fontSize: '2rem' }} /><FaUserMd style={{ fontSize: '1.5rem', marginTop: '10px' , marginLeft : "1.5px" }} />
   {showChatTooltipD && (
            <div style={{ position: 'absolute', top: chatTooltipPositionD.y, left: chatTooltipPositionD.x, background: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '5px', borderRadius: '5px' }}>
              Chat with a Doctor
            </div>
          )}
                </button>
                {/* Button to start chat with a patient */}
                <button onClick={handleOpenPatientModal} 
                style={{ width: '90px', height: '50px', display: 'flex', justifyContent: 'space-between' }} onMouseEnter={handleHoverChatP} onMouseLeave={handleLeaveChatP}>
                <FaComments style={{ fontSize: '2rem' }} />
                <FaUser style={{ fontSize: '1.5rem', marginTop: '10px' , marginLeft : "1.5px" }} />
                {showChatTooltipP && (
            <div style={{ position: 'absolute', top: chatTooltipPositionP.y, left: chatTooltipPositionP.x, background: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '5px', borderRadius: '5px' }}>
              Chat with a Patient
            </div>
          )}
                </button>
                  </div>
          )}

      {user && (
        <div>
 {/* Wallet icon with the wallet amount */}

          {user.role === 'pharmacist' && (
            <div>
            
            <FaWallet style={{ color: 'White', marginLeft: '10px', marginRight:'-55px'}} />

            {/* Display the wallet amount (replace '100' with the actual wallet amount) */}
            <span style={{ color: 'White', marginLeft: '-5px'  , marginRight:"10px"}}>${walletPharma}</span>
      
      
          <FontAwesomeIcon icon={faUser} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft:"20px" }} />
                <h3> {user.user}</h3>

            <Link to={`/PharmacistSettings/${user.user}`}>
              <FontAwesomeIcon icon={faCog} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '0px' }} />
            </Link>
            </div>
          )}
        {user.role === 'patient' && (
  <div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <button onClick={handleOpenModal} onMouseEnter={handleHoverChat} onMouseLeave={handleLeaveChat}>
      {/* Chat icon */}
      <FaComments style={{ color: 'White', marginLeft: '0' , fontSize:"20px" }} />
      {showChatTooltip && (
            <div style={{ position: 'absolute', top: chatTooltipPosition.y, left: chatTooltipPosition.x, background: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '5px', borderRadius: '5px' }}>
              Chat with a Pharmacist
            </div>
          )}
    </button>
  </div>
    
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , marginRight:"325px" , marginLeft:"-10px" }}>
    <Link to={`/CurrentOrders/${user.user}`} onMouseEnter={handleHoverOrders} onMouseLeave={handleLeaveOrders}>
    {/* Icon for Orders page */}
    <FaList style={{ color: 'White', fontSize: '3.0rem', marginRight: '5px' , marginLeft:"10px"}} />
    {showOrdersTooltip && (
            <div style={{ position: 'absolute', top: tooltipPosition.y, left: tooltipPosition.x, background: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '5px', borderRadius: '5px' }}>
              My Orders
            </div>
          )}
  </Link>
    </div>

  {/* Wallet icon with the wallet amount */}
  <FaWallet style={{ color: 'White', marginLeft: '10px', marginRight:'-55px'}} />

      {/* Display the wallet amount (replace '100' with the actual wallet amount) */}
      <span style={{ color: 'White', marginLeft: '-5px'  , marginRight:"10px"}}>${wallet}</span>


    <FontAwesomeIcon icon={faUser} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft:"20px" }} />
          <h3> {user.user}</h3>

    <Link to={`/patientSettings/${user.user}`}>
      {/* Settings icon for patient */}
      <FontAwesomeIcon icon={faCog} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
    </Link>
    
    <Link to={`/cart/${user.user}`}>
      {/* Icon for Cart */}
      <FaShoppingCart style={{ color: 'White', marginLeft: '10px' }} />
    </Link>
  </div>
)}
           {user.role === 'admin' && (
            <Link to={`/adminSettings/${user.user}`}>
              <FontAwesomeIcon icon={faCog} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
            </Link>
          )}
          { (user.role === 'pharmacist') && 

  <Link to={`/Notifications`} className="notification-icon">
    <FaBell />
  </Link>

  
}

{(user.role === 'admin'|| user.role ==='pharmacist') && (
  <Link to="/sales"> <FontAwesomeIcon onMouseEnter={handleSales}  onMouseLeave={handleLeaveSales}  icon={faChartSimple} style={{ color: 'White', stroke: 'white', strokeWidth: '2', marginLeft: '10px' }} />
    {showSales && (
            <div style={{ position: 'absolute', top: SalesPosition.y, left: SalesPosition.x, background: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '5px', borderRadius: '5px' }}>
              Show Sales Report
            </div>
          )}
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
        <Modal.Header>
          <Modal.Title>Choose a Pharmacist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="pharmacistDropdown">
            <Form.Label>Select Pharmacist</Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedPharmacist(e.target.value)}>
              <option value="">Select Pharmacist</option>
              {pharmacists.map((pharmacist) => (
                <option key={pharmacist.username} value={pharmacist.username}>
                  {pharmacist.username}
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

{/* ... (patient modal code) */}
<Modal show={showPatientModal} onHide={handleClosePatientModal}>
  <Modal.Header>
    <Modal.Title>Choose a Patient</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group controlId="patientDropdown">
      <Form.Label>Select Patient</Form.Label>
      <Form.Control as="select" onChange={(e) => setSelectedPatient(e.target.value)}>
        <option value="">Select Patient</option>
        {patients.map((patient) => (
          <option key={patient.username} value={patient.username}>
            {patient.username}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClosePatientModal}>
      Close
    </Button>
    <Button variant="primary" onClick={() => { handleStartChatWithPatient(); handleClosePatientModal(); }} disabled={!selectedPatient}>
      Start Chat
    </Button>
  </Modal.Footer>
</Modal>

{/* ... (doctor modal code) */}
<Modal show={showDoctorModal} onHide={handleCloseDoctorModal}>
  <Modal.Header>
    <Modal.Title>Choose a Doctor</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group controlId="doctorDropdown">
      <Form.Label>Select Doctor</Form.Label>
      <Form.Control as="select" onChange={(e) => setSelectedDoctor(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.username} value={doctor.username}>
            {doctor.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseDoctorModal}>
    <FaTimes style={{ marginRight: '5px' }} /> Close
    </Button>
    <Button variant="primary" onClick={() => { handleStartChatWithDoctor(); handleCloseDoctorModal(); }} disabled={!selectedDoctor}>
      Start Chat
    </Button>
  </Modal.Footer>
</Modal>


    </header>
  );
};

export default Navbar