import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import { faEye} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RequestModal from '../components/RequestModal';

import './MedicineList.css'; // Import your CSS file for styling

const RequestsListPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [request, setRequest] = useState("");
  const [activeRequestId, setActiveRequestId] = useState(null);

  
  const navigate = useNavigate();
  
 

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getRequests`,{
        withCredentials: true
      });

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
      const response = await axios.post(`http://localhost:4000/acceptPRequest/${username}/${password}/${name}/${email}/${hourly_rate}/${affiliation}/${educational_background}/${Working_license}/${Pharmacy_degree}`,{},{
        withCredentials: true
      });
      await axios.put(`http://localhost:4000/acceptPRequest/${reqid}`,{},{
        withCredentials: true
      });
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
      await axios.put(`http://localhost:4000/rejectPRequest/${reqid}`,{},{
        withCredentials: true
      });

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
  <div className="container">
    <div className="patients-list">
      <h2>All Requests</h2>


      {loading ? (
        <div className="spinner-container">
          <BeatLoader color="#14967f" size={15} />
        </div>
      ) : requests.length === 0 ? (
        <p>No Requests found</p>
      ) : (
        <ul className="patients-list">
          {requests.map((m) => (
            <li key={m._id}>
              <div className="patients-header">
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <strong>Username: </strong>{m.username}
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <strong>Request ID: </strong>{m._id}
                </div>
                <div style={{ flex: 1, textAlign: 'right', marginRight: '10px' }}>
                  {m.statuss === 'Pending' && (
                    <>
                      <button
                       disabled={isProcessing}
                        style={{
                          backgroundColor: '#4CAF50', /* Green */
                          border: 'none',
                          color: 'white',
                          padding: '10px 20px', // Reduced padding
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'inline-block',
                          fontSize: '14px', // Reduced font size
                          margin: '4px 2px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleAccept( m._id,m.username,m.password,m.name,m.email,m.hourly_rate,m.affiliation,m.educational_background,m.Working_license,m.Pharmacy_degree)}
                      >
                        Accept
                      </button>
                      <button
                       disabled={isProcessing}
                        style={{
                          backgroundColor: '#f44336', /* Red */
                          border: 'none',
                          color: 'white',
                          padding: '10px 20px', // Reduced padding
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'inline-block',
                          fontSize: '14px', // Reduced font size
                          margin: '4px 2px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleReject(m._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <FontAwesomeIcon
                    className="view-icon"
                    icon={faEye}
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      setModalOpen(true);
                      setRequest(m);
                      setActiveRequestId(m._id)
                      
                    }}
                  />

                </div>
              </div>
            </li>

          ))}
        </ul>
      )}
    </div>
    {modalOpen && request &&
      <RequestModal
        setOpenModal={setModalOpen}
        request={request}
      />
    }
  </div >
);
};

export default RequestsListPage;
