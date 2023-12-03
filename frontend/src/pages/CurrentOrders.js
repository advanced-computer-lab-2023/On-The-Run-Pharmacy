import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const CurrentOrders = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const { username } = useParams();

  const fetchCurrentOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getCurrentOrders/${username}`, {
        withCredentials: true,
      });
      setCurrentOrders(response.data);
    } catch (error) {
      console.error('Error fetching current orders:', error);
    }
  };
  const cancelOrder = async (orderId) => {
    try {
      console.log(orderId )
      const response = await axios.put(`http://localhost:4000/cancelOrder/${orderId}`,{},{
        withCredentials: true
      });
      if (response.status === 200) {
        setCurrentOrders(currentOrders.filter(order => order._id !== orderId));
        fetchCurrentOrders();
      }
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };
  useEffect(() => {
    fetchCurrentOrders();
  }, [username]);

  return (
    <div>
      <h1>Current Orders for {username}</h1>
      {currentOrders.map((order, index) => (
        <div key={index}>
          <h2>Order ID: {order._id}</h2>
          <p>Status: {order.statuss}</p>
          <button onClick={() => cancelOrder(order._id)}>Cancel Order</button>
          {/* Display other current order details */}
        </div>
      ))}
    </div>
  );
};

export default CurrentOrders;
