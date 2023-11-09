import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Checkout = () => {
  const { username } = useParams();
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getAddresses/${username}`);
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getAddresses/${username}`);
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, [username]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!address) {
      setError('Address cannot be empty');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/addAddress/${username}/${address}`);
      setSuccess('Address added successfully');
      console.log(response.data);
      fetchAddresses();
    } catch (error) {
      setError('Error adding address');
      console.error('Error adding address:', error);
    }
  };
  

  return (
    <div>
      <h1>Choose Address</h1>
      {addresses.map((address, index) => (
        <button key={index} onClick={() => setSelectedAddress(address)}>
          {address}
        </button>
      ))}
      {selectedAddress && <p>Selected Address: {selectedAddress}</p>}
  
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <button type="submit">Add Address</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
    </div>
  );
};

export default Checkout;