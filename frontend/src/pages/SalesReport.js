import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getSales');
        setSales(response.data);
      } catch (error) {
        console.error('Failed to fetch sales', error);
      }
    };

    fetchSales();
  }, []);

  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return (!selectedMonth || saleDate.getMonth() + 1 === selectedMonth) &&
           (!selectedMedicine || sale.medicineId.name === selectedMedicine) &&
           (!startDate || new Date(startDate) <= saleDate) &&
           (!endDate || saleDate <= new Date(endDate));
  });

  const medicineNames = [...new Set(sales.map(sale => sale.medicineId.name))];

  return (
    <div>
      <h1>Sales Report</h1>
      <label>
        Select Month:
        <input type="number" min="1" max="12" value={selectedMonth || ''} onChange={e => setSelectedMonth(Number(e.target.value))} />
      </label>
      <label>
        Select Medicine:
        <select value={selectedMedicine || ''} onChange={e => setSelectedMedicine(e.target.value)}>
          <option value="">All</option>
          {medicineNames.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </label>
      <label>
        Start Date:
        <input type="date" value={startDate || ''} onChange={e => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate || ''} onChange={e => setEndDate(e.target.value)} />
      </label>
      {filteredSales.map((sale) => (
        <div key={sale._id}>
          <p>Medicine Name: {sale.medicineId.name}</p>
          <p>Price: {sale.medicineId.price}</p>
          <p>Amount: {sale.amount}</p>
          <p>Date: {sale.date}</p>
        </div>
      ))}
    </div>
  );
};

export default SalesReport;