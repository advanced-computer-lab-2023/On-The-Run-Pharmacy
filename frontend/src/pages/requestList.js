import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './MedicineList.css'; // Import your CSS file for styling

const RequestsListPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
 

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getRequests`);

      if (response.status === 200) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
 

  return (
    <div className="medicine-list-container">
      <h1>All Requests</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : requests.length > 0 ? (
        <ul className="medicine-list">
          {requests.map((m) => (
            <li key={m._id} className="medicine-item">
              <div className="medicine-details">
              <strong>Request ID:</strong> {m._id}<br />
                <strong>Name:</strong> {m.name}<br />
                <strong>Username:</strong> {m.username}<br />
                <strong>email:</strong> {m.email}<br />
                <strong>Educational Background:</strong> {m.educational_background}<br />
                <strong>Afilliation:</strong> {m.affiliation}<br />
                
                
                
              </div>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No Requests found.</p>
      )}
    </div>
  );
};

export default RequestsListPage;
