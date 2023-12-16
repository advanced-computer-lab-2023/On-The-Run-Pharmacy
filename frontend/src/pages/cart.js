import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const CartPage = () => {
  const { username } = useParams();
  const navigate=useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  let totalprice=0;
  useEffect(() => {
    const fetchCart = async () => {
      try {
       
        const response = await axios.get(`http://localhost:4000/getPatientCart/${username}`,{
          withCredentials: true
        });
        console.log(response.data);

        if (response.status === 200) {
            setItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [username]);
  const deleteFromCart = async (medicineId) => {
    try {
        console.log(medicineId);
      const response = await axios.delete(`http://localhost:4000/deleteFromCart/${username}/${medicineId}`,{
        withCredentials: true
      });
  
      if (response.status === 200) {
        console.log('Item deleted from cart successfully');
        // Remove the deleted item from the cart state
        setItems(response.data);
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };
  const updateAmount = async (medicineId, newAmount) => {
    try {
      const response = await axios.put(`http://localhost:4000/updateCart/${username}/${medicineId}/${newAmount}`,{},{
        withCredentials: true
      });
  
      if (response.status === 200) {
        console.log('Item amount updated successfully');
        // Update the amount of the updated item in the cart state
        setItems(response.data);
      }
    } catch (error) {
      console.error('Error updating item amount:', error);
    }
  };
  

  return (
    <div style={{ maxWidth: '60%', margin: '0 auto' }}>
  <h1>Cart</h1>
  {loading ? (
    <p>Loading...</p>
  ) : items.length > 0 ? (
    <div className="row">
      {items.map((item) => (
        <div key={item.medicine_id} className="col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div style={{ textAlign: 'left' }}>
                  <p><strong>Name:</strong> {item.medicineName}</p>
                  <p><strong>Amount:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> {item.price}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button 
  className="btn btn-primary mb-1" 
  style={{ backgroundColor: '#14967f', borderColor: '#14967f',transition: 'none' }} 
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#14967f'} 
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14967f'} 
  onClick={() => updateAmount(item.medicine_id, item.quantity + 1)}
>
  <FontAwesomeIcon icon={faPlus} />
</button>
<button 
  className="btn btn-primary mb-1" 
  style={{ backgroundColor: '#14967f', borderColor: '#14967f',transition: 'none' }} 
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#14967f'} 
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14967f'} 
  onClick={() => updateAmount(item.medicine_id, item.quantity - 1)}
>
  <FontAwesomeIcon icon={faMinus} />
</button> 

<button 
  className="btn btn-primary mb-1" 
  style={{ backgroundColor: '#14967f', borderColor: '#14967f',transition: 'none' }} 
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#14967f'} 
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14967f'} 
  onClick={() => deleteFromCart(item.medicine_id)}
>
  <FontAwesomeIcon icon={faTrash} />
</button> 
</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No Items.</p>
  )}
  <button 
  className="btn btn-primary mb-1" 
  style={{ backgroundColor: '#14967f', borderColor: '#14967f',transition: 'none' ,marginRight: '10px'}} 
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#14967f'} 
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14967f'} 
  onClick={() => navigate(`/checkout/${username}`)}
>
Checkout
</button> 

<button 
  className="btn btn-primary mb-1" 
  style={{ backgroundColor: '#14967f', borderColor: '#14967f',transition: 'none' }} 
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#14967f'} 
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14967f'} 
  onClick={() => navigate(-1)}
>
Back
</button> 
</div>);
};

export default CartPage;