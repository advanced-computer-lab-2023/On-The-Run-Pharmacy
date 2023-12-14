import React,{ useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Spinner, Container, Row, Col } from 'react-bootstrap';

const PatientRegistration = () => {
    const navigate = useNavigate();

    const[username,setUsername]=useState('')
const[name,setName]=useState('')
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[date_of_birth,setDateOfBirth]=useState('')
const[gender,setGender]=useState('')
const[mobile_number,setMobileNumber]=useState('')
const [emergency_contact, setEmergencyContact] = useState({
    full_name: '',
    mobile_number: '',
    relation_to_patient:''
  });

  const [error, setError] = useState(null);
  const [isRequestPending, setIsRequestPending] = useState(false);

  


    const handleSubmit = async (e) => {
        e.preventDefault();
        const p={username,name,email,password,date_of_birth,gender,mobile_number,emergency_contact}
        try {
          // Make a POST request to your backend API endpoint
          const response = await axios.post('http://localhost:4000/register/patient', p,{
            withCredentials: true
          });
      
          if (response.status === 201) {
            console.log('Registration successful:', response.data);
            setUsername('');
            setName('');
            setEmail('');
            setPassword('');
            setDateOfBirth('');
            setGender('Male');
            setMobileNumber('');
            setEmergencyContact({ full_name: '', mobile_number: '' });
            setError(null);
            navigate(`/login`);
           
          }
          else {
            console.error('Registration failed:', response.data);
            setError('Registration failed. Please check your data and try again.');
          }
        } catch (error) {
          console.error('Registration failed:', error);
          setError('Registration failed. Please try again later.');
        }
      };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '87vh', flexDirection: 'column' }}>
      <Card style={{ height: '85vh' }}>
        <Card.Body>
          <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#343a40', marginBottom: '5px' }}>Register as Patient</h4>
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

                  <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      value="Male"
                      checked={gender === 'Male'}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      value="Female"
                      checked={gender === 'Female'}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="mobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="tel" value={mobile_number} onChange={(e) => setMobileNumber(e.target.value)}   required />
                  </Form.Group>
                </Col>

              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="emergencyContact.fullName">
                    <Form.Label>Emergency Contact Name</Form.Label>
                    <Form.Control type="text" value={emergency_contact.full_name} onChange={(e) => setEmergencyContact({ ...emergency_contact, full_name: e.target.value })} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="emergencyContact.mobileNumber">
                    <Form.Label>Emergency Contact Mobile</Form.Label>
                    <Form.Control type="tel" value={emergency_contact.mobile_number} onChange={(e) => setEmergencyContact({ ...emergency_contact, mobile_number: e.target.value })} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="emergencyContact.relationToPatient">
                    <Form.Label>Emergency Contact Relation</Form.Label>
                    <Form.Control type="text" value={emergency_contact.relation_to_patient} onChange={(e) => setEmergencyContact({ ...emergency_contact, relation_to_patient: e.target.value })} required />
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

export default PatientRegistration;
