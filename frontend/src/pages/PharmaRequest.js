import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Spinner, Container, Row, Col } from 'react-bootstrap';


const PharmaRegistration = () => {
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [hourly_rate, setHourly_rate] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [educational_background, setEducational_background] = useState('');
  const [workingLicense, setWorkingLicense] = useState(null);
  const [pharmacistDegree, setPharmacistDegree] = useState(null);
  const [pharmacistId, setPharmacistId] = useState(null);
 
  const [error, setError] = useState(null);
  const [isPharmacistRegistered] = useState(false);
  const [isRequestPending, setIsRequestPending] = useState(false);


  const handleWorkingLicenseChange = (e) => {
    setWorkingLicense(e.target.files[0]);
  };

  const handlePharmacistDegreeChange = (e) => {
    setPharmacistDegree(e.target.files[0]);
  };

  const handlePharmacistIdChange = (e) => {
    setPharmacistId(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password); // Added password as a regular form field
    formData.append('hourly_rate', hourly_rate);
    formData.append('affiliation', affiliation);
    formData.append('educational_background', educational_background);
    formData.append('date_of_birth', date_of_birth);
    formData.append('workingLicense', workingLicense);
    formData.append('pharmacistDegree', pharmacistDegree);
    formData.append('pharmacistId', pharmacistId);

    try {
      const response = await axios.post('http://localhost:4000/createRequest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },{
        withCredentials: true
      });

      if (response.status === 201) {
        setSuccessMessage('Registration successful');
        setUsername('');
        setName('');
        setEmail('');
        setPassword('');
        setDateOfBirth('');
        setHourly_rate('');
        setAffiliation('');
        setEducational_background('');
        setWorkingLicense(null);
        setPharmacistDegree(null);
        setPharmacistId(null);
        setError(null);
        navigate('/'); // Redirect to the appropriate page
      }
    } catch (error) {
      console.error('Error registering pharmacist:', error);
      setSuccessMessage(null);
    }
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '87vh', flexDirection: 'column' }}>
      <Card style={{height:'85vh'}}>
        <Card.Body>
        <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#343a40', marginBottom: '5px' }}>Register as Pharmacist</h4>
          {error && <p>{error}</p>}
          {isRequestPending ? (
            <p>Registration request is pending. Please wait for approval.</p>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="dateOfBirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" value={date_of_birth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col>

                  <Form.Group controlId="hourlyRate">
                    <Form.Label>Hourly Rate</Form.Label>
                    <Form.Control type="number" value={hourly_rate} onChange={(e) => setHourly_rate(e.target.value)} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="Affiliation">
                    <Form.Label>Affiliation</Form.Label>
                    <Form.Control type="text" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="educational_background">
                    <Form.Label>Educational Background</Form.Label>
                    <Form.Control type="text" value={educational_background} onChange={(e) => setEducational_background(e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="workingLicense">
                    <Form.Label>Medical License</Form.Label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="workingLicense" accept=".pdf" onChange={handleWorkingLicenseChange} />
                      <label className="custom-file-label" htmlFor="workingLicense">
                        Choose file...
                      </label>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>

                  {/* Pharmacist Degree PDF */}
                  <Form.Group controlId="pharmacistDegree">
                    <Form.Label>Medical Degree</Form.Label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="pharmacistDegree" accept=".pdf" onChange={handlePharmacistDegreeChange} />
                      <label className="custom-file-label" htmlFor="pharmacistDegree">
                        Choose file...
                      </label>
                    </div>
                  </Form.Group>
                </Col>
                <Col>


                  {/* Pharmacist ID PDF */}
                  <Form.Group controlId="pharmacistId">
                    <Form.Label>Pharmacist ID</Form.Label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="pharmacistId" accept=".pdf" onChange={handlePharmacistIdChange} />
                      <label className="custom-file-label" htmlFor="pharmacistId">
                        Choose file...
                      </label>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" disabled={isRequestPending} style={{ marginTop: '10px' }}>
                {isRequestPending ? <Spinner animation="border" size="sm" /> : 'Register'}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
      <p style={{ color: '#8a90a2', fontSize: '15px', fontWeight: '400' }}>Back to <Link to="/login" style={{ color: '#0055ff', fontSize: '15px', fontWeight: '600' }}>Log In</Link></p>
     
    </Container>

  );



};

export default PharmaRegistration;
