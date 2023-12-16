import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CurrentOrders.css';

const OrderCard = ({ order, openModal, cancelOrder }) => (
  <div className="card order-card" key={order._id}>
    <div className="card-body">
      <div className="order-details d-flex justify-content-between">
        <div>
          <strong>Order ID:</strong> {order._id}
        </div>
        <div>
          <strong>Status:</strong> {order.statuss}
        </div>
        <div className="icons">
          <FontAwesomeIcon
            className="eye-icon"
            icon={faEye}
            onClick={() => openModal(order._id)}
          />
          <FontAwesomeIcon
            className="cancel-icon"
            icon={faTimes}
            onClick={() => cancelOrder(order._id)}
          />
        </div>
      </div>
    </div>
  </div>
);

const Modal = ({ isOpen, closeModal, order, cancelOrder }) => {
  const modalClassName = isOpen ? 'modal modal-open' : 'modal';

  return isOpen ? (
    <div className={modalClassName}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Order Details</h2>

        {/* Render order details dynamically */}
        {Object.entries(order).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}

        {/* Add more order details as needed */}
        <button
          className="btn btn-secondary"
          onClick={() => {
            cancelOrder(order._id);
            closeModal(); // Close the modal after canceling the order
          }}
        >
          Cancel Order
        </button>
      </div>
    </div>
  ) : null;
};

const CurrentOrders = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate(); // Add the useNavigate hook

  const fetchCurrentOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getCurrentOrders/${username}`, {
        withCredentials: true,
      });
      setCurrentOrders(response.data);
    } catch (error) {
      console.error('Error fetching current orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/cancelOrder/${orderId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setCurrentOrders(currentOrders.filter((order) => order._id !== orderId));
      }
    } catch (error) {
      console.error('Error canceling order:', error);
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
    fetchCurrentOrders();
  }, [username]);

  return (
    <div className="container">
      <div
        className="form-group"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
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
        <h2 style={{ textAlign: 'center', margin: 0 }}>My Current Orders</h2>
        <Link
          to={`/pastOrders/${username}`}
          className="btn btn-secondary mb-1"
          style={{
            backgroundColor: '#333',
            borderColor: '#333',
            transition: 'none',
            cursor: 'pointer',
          }}
        >
          Past Orders
        </Link>
      </div>

      <div className="current-orders-list" style={{ textAlign: 'center' }}>
        {loading ? (
          <div className="spinner-container">
            <BeatLoader color="#14967f" size={15} />
          </div>
        ) : currentOrders.length === 0 ? (
          <p>No current orders found</p>
        ) : (
          <div className="card-container">
            {currentOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                openModal={openModal}
                cancelOrder={cancelOrder}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal isOpen={isModalOpen} closeModal={closeModal} order={selectedOrder} cancelOrder={cancelOrder} />
      </div>
    </div>
  );
};

export default CurrentOrders;
