import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js'; 
import PaymentForm from '../components/Stripe'; 
import {loadStripe} from '@stripe/stripe-js'; 
const stripePromise = loadStripe('your-publishable-key');

const Checkout = () => {
  const { username,totalprice} = useParams();
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentmethod1, setpaymentmethod1] = useState(null);
  const [items, setItems] = useState([]);
  const [orderId, setOrderId]= useState(null);
  const [wallet, setWallet]= useState(null); 
  const [patientcart, setPatientCart]= useState(null); 
  const [totalprice1, setTotalPrice1]= useState(0);
  const [walletError, setWalletError] = useState(null);
  const [enoughAmount, setEnoughAmount] = useState(true);
  const navigate=useNavigate();
  
  

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getAddresses/${username}`,{
        withCredentials: true
      });
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getAddresses/${username}`,{
          withCredentials: true
        });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    const fetchWallet = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getWallet/${username}`,{
          withCredentials: true
        });
        setWallet(response.data);
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getPatientCart/${username}`,{
          withCredentials: true
        });
        if (response.status === 200) {
          let p = 0;
          const itemsFromResponse = response.data;
          itemsFromResponse.forEach(item => {
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
      handleamount();
    }
    // Add more else if statements for other payment methods if needed
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!address) {
      setError('Address cannot be empty');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/addAddress/${username}/${address}`,{},{
        withCredentials: true
      });
      setSuccess('Address added successfully');
      console.log(response.data);
      fetchAddresses();
    } catch (error) {
      setError('Error adding address');
      console.error('Error adding address:', error);
    }
  };
  const handleCancelOrder = async (ordid) => {
    try {
      // Make a DELETE request to the backend to delete the patient
      await axios.put(`http://localhost:4000/cancelOrder/${ordid}`,{},{
        withCredentials: true
      });

      // After successful deletion, refresh the patient list by re-fetching

    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };
  const handleamount = async () => {
    try {
      for(let i=0;i<items.length;i++){
      let id = items[i].medicine_id;
      let amount = items[i].quantity;
      console.log(`Updating quantity for medicine ${id} to ${amount}`);
      const response1 = await axios.post(`http://localhost:4000/updateMedQuantity/${id}/${amount}`,{},{
        withCredentials: true
      });
      console.log('Order amount updated successfullyy:', response1.data);}
    } catch (error) {
      console.error(`Error updating quantity for medicine:`, error.message);
    }
  };
  const handleCreateOrder = async (statuss,cart,shippingAddress,paymentMethod) => {
    try {
      
      const response = await axios.post(`http://localhost:4000/createOrder/${username}/${statuss}/${shippingAddress}/${paymentMethod}/${totalprice1}`,{},{
        withCredentials: true
      });
     
      console.log('Order created successfully:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  const handleWalletPayment = async (username,totalprice) => {
    try {
     
      const response = await axios.put(`http://localhost:4000/updatewallet/${username}/${totalprice}`,{},{
        withCredentials: true
      });
     
      const response1 = await axios.get(`http://localhost:4000/getWallet/${username}`,{
        withCredentials: true
      });
      setWallet(response1.data);
      
  
      if (response.status === 400) {
        setWalletError('An error occurred while updating the wallet');
        console.log('An error occurred while updating the wallet')
        
      } else {
        console.log(response.data.message);
        handleCreateOrder('Pending', items, selectedAddress, paymentmethod1);
        setWalletError(null);
      }
    } catch (error) {
      console.error('An error occurred while making the payment:', error);
      setWalletError('An error occurred while updating the wallet');
    }
  };
const handleCreditCardPayment = async () => {


};





return (
  <div className="container">
  <div className="row">
    <div className="col-12">
      <div className="card" style={{ padding: '20px', position: 'relative', marginTop: '20px',height:'70%',width:'110%' }}>
        <div className="card-body">
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
          </div>
          {walletError && <p>{walletError}</p>}
          <h1 className="card-title text-left">Your Cart</h1>
                    {items.map((item, index) => (
            <div key={index} className="row">
              <div className="col-12 text-left">
                <p className="card-text">{item.medicineName} - ${item.price} x {item.quantity}</p>
              </div>
            </div>
          ))}
<h2 className="card-text text-left">Total Price: ${totalprice1}</h2>        </div>
      </div>
        <div className="card" style={{ padding: '20px', position: 'relative', marginTop: '30px',height:'40%',width: '270%' }}>
          <div className="card-body">
            <h1 className="card-title">Choose Payment Method</h1>
            <label>
              <input type="radio" value="Wallet" checked={paymentmethod1 === 'Wallet'} onChange={(e) => setpaymentmethod1(e.target.value)} />
              Wallet
            </label>
            <label>
              <input type="radio" value="Credit Card" checked={paymentmethod1 === 'Credit Card'} onChange={(e) => setpaymentmethod1(e.target.value)} />
              Credit Card
            </label>
            <label>
            <input type="radio" value="Cash on Delivery" checked={paymentmethod1 === 'Cash on Delivery'} onChange={(e) => setpaymentmethod1(e.target.value)} />
            Cash on Delivery
            </label>
            <div style={{ marginTop: '20px' }}>
              <button onClick={() => handlePayment()}>Submit Order</button>
            </div>
            {paymentmethod1 === 'Credit Card' && (
                  <Elements stripe={stripePromise}>
                    <PaymentForm />
                  </Elements>
                )}
          </div>
        </div>
      </div>
    </div>
    <div className="row">
  <div className="col-12">
    <div className="card" style={{ padding: '5px', position: 'relative', marginTop: '20px',height:'70%',width:'120%',marginLeft: '-25%' }}>
      <div className="card-body">
        <h1 className="card-title">Choose Address</h1>
        {addresses.map((address, index) => (
          <div key={index} style={{ textAlign: 'left' }}>
            <input type="radio" id={`address${index}`} name="address" value={address} onChange={() => setSelectedAddress(address)} />
            <label htmlFor={`address${index}`}>{address}</label>
          </div>
        ))}
        {selectedAddress && <p className="card-text">Selected Address: {selectedAddress}</p>}
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '470px' }}>
    <label style={{ display: 'flex', justifyContent: 'space-between', width: '320px', fontSize: '20px' }}>
      Address:
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={{ flex: 1, height: '30px' }} />
    </label>
    <div style={{ textAlign: 'right' }}>
  <button type="submit" style={{ width: '160px', padding: '2px' }}>Add Address</button>
</div>  </div>
  {error && <p>{error}</p>}
  {success && <p>{success}</p>}
</form>
      </div>
    </div>
  </div>
</div>
  </div>
);
            };


export default Checkout;