import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams,useNavigate } from 'react-router-dom';

import './MedicineList.css'; // Import your CSS file for styling


const MedicineListPagep = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [medicalUseFilter, setMedicalUseFilter] = useState('');
  const { username } = useParams();
  const [wallet, setWallet]= useState(null);
  const [doctorUsername, setDoctorUsername] = useState('');
  const navigate=useNavigate();
  const [doctor2Username, setDoctor2Username] = useState(''); // New state for the doctor's username
  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getMedicines`,{
        withCredentials: true
      });

      if (response.status === 200) {
        setMedicines(response.data);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchWallet = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getPharmaWallet/${username}`,{
        withCredentials: true
      });
      setWallet(response.data);
      console.log("aabababab",response.data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  useEffect(() => {
    fetchMedicines();
    fetchWallet();
  }, []);

  const handleSearch = () => {
    if (searchName === '' && medicalUseFilter === '') {
      fetchMedicines();
      return;
    }

    const filtered = medicines.filter((medicine) => {
      const nameMatch = searchName
        ? medicine.name && medicine.name.toLowerCase().includes(searchName.toLowerCase())
        : true;
      const medicalUseMatch = medicalUseFilter
        ? medicine.medicalUse && medicine.medicalUse.toLowerCase().includes(medicalUseFilter.toLowerCase())
        : true;
      return nameMatch && medicalUseMatch;
    });

    setMedicines(filtered);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
    handleSearch();
  };

  const handleMedicalUseFilterChange = (e) => {
    setMedicalUseFilter(e.target.value);
    handleSearch();
  };

  const resetFilters = () => {
    setSearchName('');
    setMedicalUseFilter('');
    fetchMedicines();
  };
  const handleArchive = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/archiveMedicine/${id}`, {
        // any additional data you want to send
      });
  
      if (response.status === 200) {
        // Update the local state or fetch the updated list of medicines
        // based on your application logic
        console.log('Medicine archived successfully:', response.data);
      }
    } catch (error) {
      console.error('Error archiving medicine:', error);
    }
  };
  const handleUnarchive = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/unarchiveMedicine/${id}`, {
        // any additional data you want to send
      });

      if (response.status === 200) {
        // Update the local state or fetch the updated list of medicines
        // based on your application logic
        console.log('Medicine unarchived successfully:', response.data);
      }
    } catch (error) {
      console.error('Error unarchiving medicine:', error);
    }
  };

  return (
    <div className="medicine-list-container">
      <div style={{ padding: '20px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <h2>Wallet: {wallet}</h2>
      </div>
       <Link to={`/Notifications`}>Notifications</Link>
       <Link to={`/sales`}>View Sales Report</Link>
       
       <h1>All Medicines</h1>

     
      <div className="filter-container">
        <input
          type="text"
          placeholder="Enter medicine's name"
          value={searchName}
          onChange={handleSearchNameChange}
        />
        <input
          type="text"
          placeholder="Filter by medical use"
          value={medicalUseFilter}
          onChange={handleMedicalUseFilterChange}
        />
        <button button style={{ backgroundColor: '#14967f', color: 'white' }}  onClick={resetFilters}>Reset Filters</button>
      </div>

      {loading ? (
  <p>Loading...</p>
) : medicines.length > 0 ? (
  <div className="row">
    {medicines.map((m, index) => (
      <div key={m._id} className="col-lg-3 col-md-6 mb-4">
        <div className="card h-100 medicine-card">
          <img src={m.pictureUrl} className="card-img-top medicine-img" alt={m.name} />
          <div className="card-body">
            <h5 className="card-title"><strong>{m.name}</strong></h5>
            <p className="card-text">
            <div style={{ textAlign: 'left' }}>
              <strong>Price:$</strong> {m.price}<br />
              <strong>Description:</strong> {m.description}<br />
              <strong>Quantity:</strong> {m.available_quantity}<br />
              <strong>Sales:</strong> {m.sales}<br />
              <strong>Status:</strong> {m.statuss}<br />
              </div>
            </p>
            <div className="medicine-add-to-cart">
              <Link to={`/edit/${m._id}`}><p className="custom-text-color">Edit</p></Link>
              <button button style={{ backgroundColor: '#14967f', color: 'white',width: '100px', height: '40px',fontSize: '13px' }}  onClick={() => handleArchive(m._id)}>Archive</button>
              <button button style={{ backgroundColor: '#14967f', color: 'white',width: '100px', height: '40px',fontSize: '13px' }}  onClick={() => handleUnarchive(m._id)}>Unarchive</button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No Medicines found.</p>
)}
      <Link to="/addMed">Add a new Medicine</Link>
      </div>

    </div>
  );
};

export default MedicineListPagep;