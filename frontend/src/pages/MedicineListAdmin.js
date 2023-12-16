import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArchive, faEye, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import MedicineModal from '../components/MedicineModal';


import './MedicineList.css'; // Import your CSS file for styling


const MedicineListPagep = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [medicalUseFilter, setMedicalUseFilter] = useState('');
  const { username } = useParams();
  const [wallet, setWallet]= useState(null);
  const [doctorUsername, setDoctorUsername] = useState('');
  const [doctor2Username, setDoctor2Username] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentMedicineId, setCurrentMedicineId] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

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
            style={{ color: '#14967f', marginRight: '10px', cursor: 'pointer' , fontSize:"30px" , marginLeft:"-450px" , marginTop:"28px"}}
          />
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
            <button onClick={resetFilters} style={{  borderRadius: '20px', // Adjust the radius as needed for the desired roundness
                           backgroundColor: 'transparent', // No background color (transparent)
                           border: '2px solid #095d7e', // Green border for Archive
                           color: '#095d7e',
                           padding: '10px 20px',
                           textAlign: 'center',
                           textDecoration: 'none',
                           display: 'inline-block',
                           fontSize: '14px',
                           margin: '4px 2px',
                           cursor: 'pointer',
                           width:"200px"}}>Reset Filters</button>
          </div>
        )}

      {loading ? (
        <p>Loading...</p>
      ) : medicines.length > 0 ? (
        <ul className="medicine-list">
          {medicines.map((m) => (
            <li key={m._id} className="medicine-item">
              <div className="medicine-details">
                <strong style={{marginBottom:"10px"}}>Name:</strong> {m.name}<br />
                <strong >Medical Use:</strong> {m.medicalUse}<br />

                <FontAwesomeIcon
                  className="View-icon"
                  icon={faEye}
                  style={{
                    color: '#14967f',
                    cursor: 'pointer',
                    position: 'relative',
                    top: '-50px',
                    right: '-340px',
                    fontSize : "20px", // Adjust the spacing
                  }}
                  onClick={() => openMedicineModal(m._id)}
                />

              </div>
              <div className="medicine-image">
              </div>
            </li>
          ))}
           {/* Medicine Details Modal */}
      {openModal && (
        <MedicineModal
          setOpenModal={setOpenModal}
          medicineId={currentMedicineId}
        />
      )}
        </ul>
      ) : (
        <p>No Medicines found.</p>
      )}
      </div>

    </div>
  );
};

export default MedicineListPagep;
