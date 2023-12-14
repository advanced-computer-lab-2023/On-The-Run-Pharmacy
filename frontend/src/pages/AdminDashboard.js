// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Dashboard.css'; // Import your CSS file for styling
import axios from 'axios';

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
  return (
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
          <Link to={`/changeAdminPassword/${username}`} className="menu-link">
            <i className="fas fa-edit"></i>
            change my password
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
};

export default AdminDashboard;
