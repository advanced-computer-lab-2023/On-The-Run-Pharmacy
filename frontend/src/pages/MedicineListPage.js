import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArchive, faEye, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import MedicineModalPatient from '../components/MedicineModalPatient';



import './MedicineList.css'; // Import your CSS file for styling

const MedicineListPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [medicalUseFilter, setMedicalUseFilter] = useState('');
  const { username } = useParams();
  const [wallet, setWallet] = useState(null);
  const [doctorUsername, setDoctorUsername] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentMedicineId, setCurrentMedicineId] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);


  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getMedicines2`, {
        withCredentials: true,
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
      const response = await axios.get(`http://localhost:4000/getWallet/${username}`, {
        withCredentials: true,
      });
      setWallet(response.data);
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

  const openMedicineModal = (medicineId) => {
    console.log(medicineId);
    setCurrentMedicineId(medicineId);
    setOpenModal(true);
  };


  return (
    <div className="medicine-list-container">
      <div style={{ padding: '20px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>  
        <FontAwesomeIcon
            className="filter-icon"
            icon={faFilter}
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            style={{ color: '#14967f', marginRight: '50px', cursor: 'pointer' , fontSize:"30px" , marginLeft:"-460px" , marginTop:"50px"}}
          />   
        </div>
      </div>

      <h1 style={{fontSize:"35px"}}>All Medicines</h1>
      {isFilterVisible && (
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
<button style={{ backgroundColor: '#14967f', color: 'white' }} onClick={resetFilters}>Reset Filters</button>        
  </div>
  )}

      {loading ? (
  <p>Loading...</p>
) : medicines.length > 0 ? (
  <div className="row">
    {medicines.map((m, index) => (
      <div key={m._id} className="col-lg-3 col-md-6 mb-4">
        <div className="card h-100 medicine-card custom-card-height">
          <div className="card-body">
          <FontAwesomeIcon
                  className="View-icon"
                  icon={faEye}
                  style={{
                    color: '#14967f',
                    cursor: 'pointer',
                    position: 'relative',
                    top: '-2px',
                    right: '-65px',
                    fontSize : "20px", // Adjust the spacing
                  }}
                  onClick={() => openMedicineModal(m._id)}
                />
            <h5 className="card-title" style={{fontSize:"20px" , fontWeight:"bold"}}>{m.name}</h5>
            <p className="card-text">
              
              <strong>Price: $</strong> {m.price}<br />
              <strong>Medical Use:</strong> {m.medicalUse}<br />


              </p>

                <img
                            src={m.pictureUrl}
                            alt={m.name}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
          </div>
        </div>
      </div>
    ))}
      {/* Medicine Details Modal */}
      {openModal && (
        <MedicineModalPatient
          setOpenModal={setOpenModal}
          medicineId={currentMedicineId}
        />
      )}
  </div>
) : (
  <p>No Medicines found.</p>
)}
</div>
);
};

export default MedicineListPage;
