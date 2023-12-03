// AlternativeMedicinesPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AlternativeMedicinesPage = () => {
  const { medicineId } = useParams();
  const [alternativeMedicines, setAlternativeMedicines] = useState([]);

  useEffect(() => {
    const fetchAlternativeMedicines = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getAlternativeMedicines/${medicineId}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setAlternativeMedicines(response.data);
        }
      } catch (error) {
        console.error('Error fetching alternative medicines:', error);
      }
    };

    fetchAlternativeMedicines();
  }, [medicineId]);

  return (
    <div>
      <h1>Alternative Medicines</h1>
      {alternativeMedicines.length > 0 ? (
        <ul>
          {alternativeMedicines.map((medicine) => (
            <li key={medicine._id}>{medicine.name}</li>
          ))}
        </ul>
      ) : (
        <p>No alternative medicines found.</p>
      )}
    </div>
  );
};

export default AlternativeMedicinesPage;
