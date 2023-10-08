import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MedicineListPage = () => {
  
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchMedicines= async () => {
      try {
       
        const response = await axios.get(`http://localhost:4000/getMedicines`);
        console.log(response.data);

        if (response.status === 200) {
          setMedicines(response.data);
        }
      } catch (error) {
        console.error('Error fetching medicines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);
  const handleSearch = () => {
    // Filter patients based on the search name
    const filtered = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setMedicines(filtered);
  };
  

  return (
    <div>
      <h1>All Medicines</h1>
      <div>
        <input
          type="text"
          placeholder="Enter medicine's name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : medicines.length > 0 ? (
        <ul>
          {medicines.map((m) => (
            <li key={m._id}>
              Name: {m.name}<br />
              Price: {m.price}<br />
              description: {m.description}<br />
              picture: {m.picture}<br />
              
              
              
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No Medicines found.</p>
      )}
    </div>
  );
};

export default MedicineListPage;