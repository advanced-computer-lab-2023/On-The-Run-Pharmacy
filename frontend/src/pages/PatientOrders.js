import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientOrders = () => {
  const [orders, setOrders] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`http://localhost:4000/getPatientOrders/${username}`);
      setOrders(response.data);
    };

    fetchOrders();
  }, [username]);

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.post(`http://localhost:4000/cancelOrder/${orderId}`);
      if (response.status === 200) {
        setOrders(orders.filter(order => order.orderId !== orderId));
      }
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div>
      <h1>Orders for {username}</h1>
      {orders.map((order, index) => (
        <div key={index}>
          <h2>Order ID: {order.orderId}</h2>
          <p>Status: {order.statuss}</p>
          <button onClick={() => cancelOrder(order.orderId)}>Cancel Order</button>
          {/* Display other order details */}
        </div>
      ))}
    </div>
  );
};

export default PatientOrders;