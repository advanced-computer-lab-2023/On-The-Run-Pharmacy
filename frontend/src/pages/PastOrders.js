// PastOrders.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CurrentOrders';

const PastOrders = () => {
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate(); // Add the useNavigate hook

  const fetchPastOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getPastOrders/${username}`, {
        withCredentials: true,
      });
      setPastOrders(response.data);
    } catch (error) {
      console.error('Error fetching past orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:4000/getOrderDetails/${orderId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setSelectedOrder(response.data);
        setIsModalOpen(true);
      } else {
        console.error('Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchPastOrders();
  }, [username]);

  return (
    <div className="container-fluid">
      <div className="header">
        <button
          className="btn btn-primary mb-1"
          style={{
            backgroundColor: '#14967f',
            borderColor: '#14967f',
            transition: 'none',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#14967f')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#14967f')}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h2>My Past Orders </h2>
      </div>

      <div className="row">
        {loading ? (
          <div className="spinner-container">
            <BeatLoader color="#14967f" size={15} />
          </div>
        ) : pastOrders.length === 0 ? (
          <p>No past orders found</p>
        ) : (
          pastOrders.map((order) => (
            // Change this line in the map function
<div className="col-md-12" key={order._id}>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order._id}</h5>
                  <p className="card-text">Status: {order.statuss}</p>
                  <FontAwesomeIcon
                    className="eye-icon"
                    icon={faEye}
                    style={{ cursor: 'pointer' }}
                    onClick={() => openModal(order._id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className={isModalOpen ? 'modal modal-open' : 'modal'}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Order Details</h2>

            {Object.entries(selectedOrder).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PastOrders;
