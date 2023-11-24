import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';  // Add Link import

const PatientOrders = () => {
  const { username } = useParams();

  return (
    <div>
      <Link to={`/pastOrders/${username}`}>View Past Orders</Link>
      <Link to={`/currentOrders/${username}`}>View Current Orders</Link>
    </div>
  );
};

export default PatientOrders;