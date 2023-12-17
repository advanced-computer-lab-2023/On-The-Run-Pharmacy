import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';


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

  const medicineNames = [...new Set(sales.map(sale => sale.medicineId ? sale.medicineId.name : ''))];
  return (
<div className="container">
<button
        className="btn btn-primary mb-1"
        style={{
          backgroundColor: '#14967f',
          borderColor: '#14967f',
          transition: 'none',
          cursor: 'pointer',
          position: 'absolute',
          top: '75px', // Adjust this value based on your navbar height
          left: '10px',
          marginTop: '10px', // Added margin-top
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#14967f')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#14967f')}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
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
          <div className="col-12" key={sale._id}>
            <Card className="mb-4" style={{ width: '950px', height: '150px' }}>
  <Card.Body>
    <Card.Title><strong>Medicine Name: </strong> {sale.medicineId ? sale.medicineId.name : ''}</Card.Title>
    <Card.Text><strong>Price: </strong> {sale.medicineId.price}</Card.Text>
    <Card.Text><strong>Amount: </strong> {sale.amount}</Card.Text>
    <Card.Text><strong>Date: </strong> {sale.date}</Card.Text>
  </Card.Body>
</Card>
          </div>
        ))}
<h2 style={{ textAlign: 'left', fontSize: '24px', marginBottom: '20px' }}>
  Total Sales: {totalSales}
</h2>        </ul>
      </div>
    </div>
  );
};

export default SalesReport;