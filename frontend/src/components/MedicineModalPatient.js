import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link ,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const MedicineModalPatient = ({ setOpenModal, medicineId }) => {
    const [MedicineDetails, setMedicineDetails] = useState([]);
  const { username } = useParams();
    const navigate = useNavigate();
 const addToCart = async (medicineId, amount) => {
            try {
              amount = parseInt(amount, 10);
              const response = await axios.post(
                `http://localhost:4000/addToCart`,
                {
                  username,
                  medicineId,
                  amount,
                },
                {
                  withCredentials: true,
                }
              );
        
              if (response.status === 200) {
                console.log('Medicine added to cart successfully');
                alert("Medicine added to cart successfully");
              }
            } catch (error) {
              console.error('Error adding medicine to cart:', error);
            }
          };

    useEffect(() => {
        const fetchMedicineDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/getMed/${medicineId}`, { withCredentials: true });
                setMedicineDetails(response.data);
            } catch (error) {
                console.error('Error fetching medicine details:', error);
            }
        };
        fetchMedicineDetails();
    }, [medicineId]);

    return (
        <div className="modalBackground">
          <div className="modalContainer" style={{ width: '80%', maxWidth: '800px', height: '80%', display: 'flex', flexDirection: 'column' }}>
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
            <div className='title' style={{ marginBottom: '20px' }}>
              <h1>Medicine Details</h1>
            </div>
            <div className="metadata" style={{ fontSize: '20px', display: 'flex', flex: 1 }}>
              <div style={{ flex: 1, marginRight: '20px', marginTop: "85px" }}>
                <p style={{ marginBottom: '20px' }}><strong>Name:</strong> {MedicineDetails.name}</p>
                <p style={{ marginBottom: '20px' }}><strong>Description:</strong> {MedicineDetails.description}</p>
                <p style={{ marginBottom: '20px' }}><strong>Price:</strong> {MedicineDetails.price}</p>
                <p style={{ marginBottom: '20px' }}><strong>Available Quantity:</strong> {MedicineDetails.available_quantity}</p>
                <p style={{ marginBottom: '20px' }}><strong>Medical Use:</strong> {MedicineDetails.medicalUse}</p>
              </div>
              <div style={{ flex: 1 }}>
                <img
                  src={MedicineDetails.pictureUrl}
                  alt={MedicineDetails.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className="medicine-add-to-cart" style={{ alignSelf: 'center', marginBottom: '20px' }}>
                <div>
              <input type="number" min="1" defaultValue="1" id={`amount-${MedicineDetails._id}`} className="amount-input" style={{ width: "60px", marginBottom: "10px" }} />
              <button style={{ borderRadius: '20px', // Adjust the radius as needed for the desired roundness
                           backgroundColor: 'transparent', // No background color (transparent)
                           border: '2px solid #4CAF50', // Green border for Archive
                           color: '#4CAF50', // Green text color
                           padding: '10px 20px',
                           textAlign: 'center',
                           textDecoration: 'none',
                           display: 'inline-block',
                           fontSize: '14px',
                           margin: '4px 2px',
                           cursor: 'pointer'}} onClick={() => addToCart(MedicineDetails._id, document.getElementById(`amount-${MedicineDetails._id}`).value)}>
                Add to cart
              </button>
              </div>
              {/* Alternative Medicines button */}
              <button
    style={{ borderRadius: '20px', // Adjust the radius as needed for the desired roundness
    backgroundColor: 'transparent', // No background color (transparent)
    border: '2px solid #095d7e', // Green border for Archive
    color: '#095d7e', // Green text color
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '4px 2px',
    cursor: 'pointer',
marginTop:"0px"}}
    onClick={() => navigate(`/alternativeMedicines/${MedicineDetails._id}`)}
  >
    Alternative Medicines
  </button>
            </div>
          </div>
        </div>
      );
      
};

export default MedicineModalPatient;
