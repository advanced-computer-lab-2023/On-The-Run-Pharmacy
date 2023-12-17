// NotificationsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegClock } from 'react-icons/fa';
const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:4000/getNotifications', {
        withCredentials: true,
      });

      if (response.status === 200) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JS
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} at ${hours}:${minutes}`;
  }

  return (
    <div className="notifications">
      <h2>NOTIFICATIONS</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="notifications-box">
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li className="notification-item" key={notification._id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="message-text">{notification.message}</span>
                    <li key={notification._id}>
                    {/* Display notification details */}
                     Medicine {notification.medicineName} is out of stock.
                    </li>
                   

                    <span className="date-text">
                    <FaRegClock />
                    {formatDate(notification.createdAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications</p>
          )}
        </div>
      )}
    </div>
    
  );

};


export default NotificationsPage;






