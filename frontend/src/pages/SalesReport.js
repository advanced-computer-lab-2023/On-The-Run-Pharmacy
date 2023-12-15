import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalSales, setTotalSales] = useState(0);
  const navigate=useNavigate();

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

  useEffect(() => {
    setTotalSales(filteredSales.reduce((total, sale) => total + (sale.medicineId.price * sale.amount), 0));
  }, [filteredSales]);

  const medicineNames = [...new Set(sales.map(sale => sale.medicineId.name))];

  return (
<div className="container">
<div className="form1-group">
      <button type="submit" onClick={() => navigate(-1)}>Back</button>                </div>  
  <div className="prescriptions1-list">
    <h2 style={{ textAlign: 'left' }}>Sales Report</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <label style={{ width: '60%' }}>
        Select Month:
        <input type="number" min="1" max="12" value={selectedMonth || ''} onChange={e => setSelectedMonth(Number(e.target.value))} />
      </label>
      <label style={{ width: '60%' }}>
        Select Medicine:
        <select value={selectedMedicine || ''} onChange={e => setSelectedMedicine(e.target.value)}>
          <option value="">All</option>
          {medicineNames.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </label>
      <label style={{ width: '60%' }}>
        Start Date:
        <input type="date" value={startDate || ''} onChange={e => setStartDate(e.target.value)} />
      </label>
      <label style={{ width: '60%' }}>
        End Date:
        <input type="date" value={endDate || ''} onChange={e => setEndDate(e.target.value)} />
      </label>
    </div>
        <ul>
          {filteredSales.map((sale) => (
            <li key={sale._id}>
              <div className="prescription1-card">
                <div className="prescription-header">
                  <span style={{ textAlign: 'left' }}><strong>Medicine Name: </strong> {sale.medicineId.name}</span>
                  <span style={{ textAlign: 'left' }}><strong>Price: </strong> {sale.medicineId.price}</span>
                  <span style={{ textAlign: 'left' }}><strong>Amount: </strong> {sale.amount}</span>
                  <span style={{ textAlign: 'left' }}><strong>Date: </strong> {sale.date}</span>
                </div>
              </div>
            </li>
          ))}
<h2 style={{ textAlign: 'left', fontSize: '24px', marginBottom: '20px' }}>
  Total Sales: {totalSales}
</h2>        </ul>
      </div>
    </div>
  );
};

export default SalesReport;