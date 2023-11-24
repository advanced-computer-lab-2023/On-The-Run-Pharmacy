import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const PastOrders = () => {
  const [pastOrders, setPastOrders] = useState([]);
  const { username } = useParams();

  const fetchPastOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getPastOrders/${username}`, {
        withCredentials: true,
      });
      setPastOrders(response.data);
    } catch (error) {
      console.error('Error fetching past orders:', error);
    }
  };

  useEffect(() => {
    fetchPastOrders();
  }, [username]);

  return (
    <div>
      <h1>Past Orders for {username}</h1>
      {pastOrders.map((order, index) => (
        <div key={index}>
          <h2>Order ID: {order._id}</h2>
          <p>Status: {order.statuss}</p>
          {/* Display other past order details */}
        </div>
      ))}
    </div>
  );
};

export default PastOrders;
