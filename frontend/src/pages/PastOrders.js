import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CurrentOrders.css';

const OrderCard = ({ order, openModal }) => (
  <div className="card order-card" key={order._id}>
    <div className="card-body">
      <div className="order-details d-flex justify-content-between">
        <div>
          <strong>Order ID:</strong> {order._id}
        </div>
        <div>
          <strong>Status:</strong> {order.statuss}
        </div>
        <div className="icons3">
          <FontAwesomeIcon
            className="eye-icon3"
            icon={faEye}
            onClick={() => openModal(order._id)}
          />
        </div>
      </div>
    </div>
  </div>
);

const Modal = ({ isOpen, closeModal, order }) => {
  const modalClassName = isOpen ? 'modal modal-open3' : 'modal3';

  return isOpen ? (
    <div className={modalClassName}>
      <div className="modal-content3">
        <span className="close3" onClick={closeModal}>
          &times;
        </span>
        <h2>Order Details</h2>

        {/* Render order details dynamically */}
        {Object.entries(order).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  ) : null;
};

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
    <div className="container3" style={{ marginTop: '20px' }}>
      <div className="header3">
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
        <h2 style={{ textAlign: 'center' }}>My Past Orders &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
        </div>

      <div className="past-orders-list">
        {loading ? (
          <div className="spinner-container3">
            <BeatLoader color="#14967f" size={15} />
          </div>
        ) : pastOrders.length === 0 ? (
          <p>No past orders found</p>
        ) : (
          <div className="card-container3">
            {pastOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                openModal={openModal}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal isOpen={isModalOpen} closeModal={closeModal} order={selectedOrder} />
      </div>
    </div>
  );
};

export default PastOrders;