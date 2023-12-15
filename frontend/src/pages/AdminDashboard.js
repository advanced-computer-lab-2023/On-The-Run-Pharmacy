// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Dashboard.css'; // Import your CSS file for styling
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie,faUserDoctor,faHospitalUser,faFileMedical,faKitMedical } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const { username } = useParams();
  const [admin,setAdmin]=useState('')
  useEffect(() => {
    // Fetch available health packages from the backend when the component mounts
    async function fetchWallet() {
      try {
        const response = await axios.get(`http://localhost:4000/getAdminByUsername/${username}`,{
          withCredentials: true
        });
        if (response.status === 200) {
          setAdmin(response.data);
          
        }
      } catch (error) {
        console.error('Error fetching admin:', error);
      }
    }
    fetchWallet();
  }, []);
  /*return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <ul className="admin-menu">
        <li>
        <Link to="/addAdmin" className="menu-link">
            <i className="fas fa-user-plus"></i>
            Manage Admins
            </Link>
        </li>
        <li>
        <Link to="/viewPatients" className="menu-link">
            <i className="fas fa-users"></i>
            Manage Patients
            </Link>
        </li>
        <li>
        <Link to={`/viewPharmacists`} className="menu-link">
            <i className="fas fa-edit"></i>
           Manage Pharmacists
          </Link>
        </li>
        <li>
        <Link to="/viewRequests" className="menu-link">
            <i className="fas fa-clipboard-list"></i>
            View Requests
            </Link>
        </li>
        <li>
          <Link to={`/getMedicines/${username}`} className="menu-link">
            <i className="fas fa-clipboard-list"></i>
            View medicines
          </Link>
        </li>
        <li>
        <Link to="/sales" className="menu-link">
            <i className="fas fa-users"></i>
            View Sales Report
            </Link>
        </li>
      </ul>
    </div>
  );
};*/


return(
 









  <div className="admin-dashboard" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '90vh' }}>
  <div className="expandable-div" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', width: '275px', height: '400px', margin: '20px' }}>
   
    <Link to={`/addAdmin`} >
    <FontAwesomeIcon style={{fontSize:'210px',color:'white',marginTop:'20px',marginBottom:'20px'}} icon={faUserTie} />
      <p style={{ color: 'white', fontSize: '35px', marginBottom: '20px' }}>Manage Admins</p>
    </Link>
  </div>
  <div className="expandable-div" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', width: '275px', height: '400px', margin: '20px' }}>
    <Link to={`/viewPharmacists`} >
    <FontAwesomeIcon style={{fontSize:'210px',color:'white',marginTop:'20px',marginBottom:'20px'}} icon={faUserDoctor} />
    <p style={{ color: 'white', fontSize: '35px', marginBottom: '18px' }}>Manage Pharmacists</p>
    </Link>
  </div>
  <div className="expandable-div" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', width: '275px', height: '400px', margin: '20px' }}>
    <Link to={`/viewPatients`} >
    <FontAwesomeIcon style={{fontSize:'210px',color:'white',marginTop:'20px',marginBottom:'20px'}} icon={faHospitalUser} />
      <p style={{ color: 'white', fontSize: '35px', marginBottom: '18px' }}>Manage Patients</p>
    </Link>
  </div>
  <div className="expandable-div" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', width: '275px', height: '400px', margin: '20px' }}>
    <Link to={`/viewRequests`} >
    <FontAwesomeIcon style={{fontSize:'210px',color:'white',marginTop:'20px',marginBottom:'20px'}} icon={faFileMedical} />
    <p style={{ color: 'white', fontSize: '35px', marginBottom: '18px' }}>Manage Requests</p>
    </Link>
  </div>
  <div className="expandable-div" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', width: '275px', height: '400px', margin: '20px' }}>
    <Link to={`/getMedicines/${username}`} >
    <FontAwesomeIcon style={{fontSize:'210px',color:'white',marginTop:'20px',marginBottom:'20px'}} icon={faKitMedical} /><p style={{ color: 'white', fontSize: '35px', marginBottom: '18px' }}>View Medicines</p>
    </Link>
  </div>
  </div>
  
  
  
  );
  };

export default AdminDashboard;
