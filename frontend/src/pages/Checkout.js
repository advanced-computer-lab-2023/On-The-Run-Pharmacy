import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/Stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Container, Card, CardContent, Typography, Radio, FormControlLabel, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faWallet, faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const stripePromise = loadStripe('your-publishable-key');

const Checkout = () => {
  const { username, totalprice } = useParams();
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentmethod1, setpaymentmethod1] = useState(null);
  const [items, setItems] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [patientcart, setPatientCart] = useState(null);
  const [totalprice1, setTotalPrice1] = useState(0);
  const [walletError, setWalletError] = useState(null);
  const [enoughAmount, setEnoughAmount] = useState(true);
  const navigate = useNavigate();
  const [showSavedAddressesModal, setShowSavedAddressesModal] = useState(false);
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);

  const handleSavedAddressesModalOpen = () => {
    setShowSavedAddressesModal(true);
    fetchSavedAddresses(); // Call the method to get saved addresses when the modal is opened
  };

  const handleSavedAddressesModalClose = () => {
    setShowSavedAddressesModal(false);
  };

  const handleNewAddressModalOpen = () => {
    setShowNewAddressModal(true);
  };

  const handleNewAddressModalClose = () => {
    setShowNewAddressModal(false);
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getAddresses/${username}`, {
        withCredentials: true,
      });
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getAddresses/${username}`, {
          withCredentials: true,
        });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, [username]);

  const fetchSavedAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getAddresses/${username}`, {
        withCredentials: true,
      });
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching saved addresses:', error);
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    handleSavedAddressesModalClose();
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getAddresses/${username}`, {
          withCredentials: true,
        });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    const fetchWallet = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getWallet/${username}`, {
          withCredentials: true,
        });
        setWallet(response.data);
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getPatientCart/${username}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          let p = 0;
          const itemsFromResponse = response.data;
          itemsFromResponse.forEach((item) => {
            p += item.price * item.quantity;
          });
          setItems(itemsFromResponse);
          setTotalPrice1(p);
        }
      } catch (error) {
        console.error('Error fetching Cart:', error);
      }
    };

    fetchCart();
    fetchWallet();
    fetchAddresses();
  }, [username]);

  const handlePayment = () => {
    if (paymentmethod1 === 'Wallet') {
      handleWalletPayment(username, totalprice1);
    } else {
      handleCreateOrder('Pending', items, selectedAddress, paymentmethod1);
      handleAmount();
      navigate(`/getMedicines/${username}`);

    }
  };

  const handleAmount = async () => {
    try {
      for (let i = 0; i < items.length; i++) {
        let id = items[i].medicine_id;
        let amount = items[i].quantity;
        console.log(`Updating quantity for medicine ${id} to ${amount}`);
        const response1 = await axios.post(
          `http://localhost:4000/updateMedQuantity/${id}/${amount}`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log('Order amount updated successfully:', response1.data);
      }
    } catch (error) {
      console.error(`Error updating quantity for medicine:`, error.message);
    }
  };

  const handleCreateOrder = async (statuss, cart, shippingAddress, paymentMethod) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/createOrder/${username}/${statuss}/${shippingAddress}/${paymentMethod}/${totalprice1}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log('Order created successfully:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleWalletPayment = async (username, totalprice) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/updatewallet/${username}/${totalprice}`,
        {},
        {
          withCredentials: true,
        }
      );

      const response1 = await axios.get(`http://localhost:4000/getWallet/${username}`, {
        withCredentials: true,
      });
      setWallet(response1.data);

      if (response.status === 400) {
        setWalletError('An error occurred while updating the wallet');
        console.log('An error occurred while updating the wallet');
      } else {
        console.log(response.data.message);
        handleCreateOrder('Pending', items, selectedAddress, paymentmethod1);
        navigate(`/getMedicines/${username}`);
        setWalletError(null);
      }
    } catch (error) {
      console.error('An error occurred while making the payment:', error);
      setWalletError('An error occurred while updating the wallet');
    }
  };

 

  const handleAddNewAddress = async () => {
    if (!address) {
      setError('Address cannot be empty');
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:4000/addAddress/${username}/${address}`,
        {},
        {
          withCredentials: true,
        }
      );
      setSuccess('Address added successfully');
      console.log(response.data);
      fetchAddresses();
      handleNewAddressModalClose();
  
      // Clear the address input
      setAddress('');
    } catch (error) {
      setError('Error adding address');
      console.error('Error adding address:', error);
    }
  };
  return (
    
    <Container>
       <button
        className="btn btn-primary mb-1"
        style={{
          backgroundColor: '#14967f',
          borderColor: '#14967f',
          transition: 'none',
          cursor: 'pointer',
          position: 'absolute',
          top: '75px', // Adjust this value based on your navbar height
          left: '10px',
          marginTop: '10px', // Added margin-top
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#14967f')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#14967f')}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <Card sx={{ margin: '10px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faShoppingCart} sx={{ marginRight: 2 }} />
            Your Cart
            {items.length > 0 && (
              <Typography variant="body2" component="div" sx={{ marginLeft: 2 }}>
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </Typography>
            )}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Medicine Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Price per Item</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.medicineName}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      Total Price:
                    </Typography>
                  </TableCell>
                  <TableCell>${totalprice1}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card sx={{ margin: '10px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} sx={{ marginRight: 2 }} />
             Choose Address
          </Typography>
          <Button onClick={handleSavedAddressesModalOpen} variant="outlined" color="primary" sx={{ marginTop: 2 }}>
            Choose from Saved Addresses
          </Button>
          <Button onClick={handleNewAddressModalOpen} variant="outlined" color="primary" sx={{ marginTop: 2, marginLeft: 2 }}>
            Add New Address
          </Button>
          {selectedAddress && (
            <Typography variant="body1" component="div" sx={{ marginTop: 2 }}>
              Selected Address: {selectedAddress}
            </Typography>
          )}

          {/* Saved Addresses Modal */}
          {/* Replace this modal component with your actual modal implementation */}
          <Modal open={showSavedAddressesModal} onClose={handleSavedAddressesModalClose}>
  <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '300px', maxWidth: '80%', margin: 'auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <Typography variant="h6" component="div">
      Saved Addresses
    </Typography>
    <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} style={{ width: '100%', marginTop: '10px', padding: '8px' }}>
      <option value="" disabled>Select an address</option>
      {addresses.map((address, index) => (
        <option key={index} value={address}>
          {address}
        </option>
      ))}
    </select>
    <Button onClick={handleSavedAddressesModalClose} variant="contained" color="primary" style={{ marginTop: '20px' }}>
      Confirm
    </Button>
  </div>
</Modal>


   {/* New Address Modal */}
   <Modal open={showNewAddressModal} onClose={handleNewAddressModalClose}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '300px', maxWidth: '80%', margin: 'auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h6" component="div">
            Add New Address
          </Typography>
          <TextField
            label="Enter New Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button onClick={handleAddNewAddress} variant="contained" color="primary">
            Add Address
          </Button>
        </div>
      </Modal>
        </CardContent>
      </Card>
      <Card sx={{ margin: '10px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Choose Payment Method
          </Typography>
          <FormControlLabel
            control={<Radio />}
            label={
              <div>
                <FontAwesomeIcon icon={faWallet} style={{ marginRight: '8px' }} />
                Wallet
              </div>
            }
            value="Wallet"
            checked={paymentmethod1 === 'Wallet'}
            onChange={(e) => setpaymentmethod1(e.target.value)}
          />
          <FormControlLabel
            control={<Radio />}
            label={
              <div>
                <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '8px' }} />
                Credit Card
              </div>
            }
            value="Credit Card"
            checked={paymentmethod1 === 'Credit Card'}
            onChange={(e) => setpaymentmethod1(e.target.value)}
          />
          <FormControlLabel
            control={<Radio />}
            label={
              <div>
                <FontAwesomeIcon icon={faMoneyBill} style={{ marginRight: '8px' }} />
                Cash on Delivery
              </div>
            }
            value="Cash on Delivery"
            checked={paymentmethod1 === 'Cash on Delivery'}
            onChange={(e) => setpaymentmethod1(e.target.value)}
          />
          <div style={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={() => handlePayment()}>
              Submit Order
            </Button>
          </div>
          {paymentmethod1 === 'Credit Card' && (
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Checkout;
