// AdminDashboard.js
import React from 'react';
import './Dashboard.css'; // Import your CSS file for styling

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <ul className="admin-menu">
        <li>
          <a href="/addAdmin" className="menu-link">
            <i className="fas fa-user-plus"></i>
            Add Another Admin
          </a>
        </li>
        <li>
          <a href="/viewPatients" className="menu-link">
            <i className="fas fa-users"></i>
            Manage Patients
          </a>
        </li>
        <li>
          <a href="/viewPharmacists" className="menu-link">
            <i className="fas fa-user-md"></i>
            Manage Pharmacists
          </a>
        </li>
        <li>
          <a href="/viewRequests" className="menu-link">
            <i className="fas fa-clipboard-list"></i>
            View Requests
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
