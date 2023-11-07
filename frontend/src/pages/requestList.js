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
  const handleAccept = async (reqid,username,password,name,email,hourly_rate,affiliation,educational_background,Working_license,Pharmacy_degree) => {
    try {
      const response = await axios.post(`http://localhost:4000/acceptPRequest/${username}/${password}/${name}/${email}/${hourly_rate}/${affiliation}/${educational_background}/${Working_license}/${Pharmacy_degree}`);
      await axios.put(`http://localhost:4000/acceptPRequest/${reqid}`);
      if (response.status === 200) {
        setRequests(requests.filter((r) => r._id !== reqid));
      }
      fetchRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  
  
  const handleReject = async (reqid) => {
    try {
      // Make a DELETE request to the backend to delete the patient
      await axios.put(`http://localhost:4000/rejectPRequest/${reqid}`);

      // After successful deletion, refresh the patient list by re-fetching
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting doctor request:', error);
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
                
                {(m.statuss !== 'rejected' && m.statuss !== 'accepted') && (
              <>
                <button onClick={() => handleAccept(m._id,m.username,m.name,m.name,m.email,m.hourly_rate,m.affiliation,m.educational_background,m.Working_license,m.Pharmacy_degree)}>Accept</button>
                <button onClick={() => handleReject(m._id)}>Reject</button>
              </>
            )}
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
