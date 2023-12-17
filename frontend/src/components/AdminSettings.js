import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ChangeAdminPass from '../pages/changeAdminPass';
import { useNavigate } from 'react-router-dom';



const AdminSettings = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    return (
        <>
        <Container style={{ padding: '10px' }}>
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
        <Row>
          <Col>
            <h1 style={{ marginBottom: '5px',fontSize: '20px',fontWeight: '600' }}>Account Settings</h1>
            <p style={{ marginBottom: '10px',fontSize: '15px',fontWeight: '500' }}>Change your account settings</p>
          </Col>
        </Row>
      </Container>
      <Container style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '20px' }}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="password">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="password" style={{fontSize: '15px',fontWeight: '500' }}>Password</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content style={{ width: '660px',marginTop: '0px' ,height:'470px' }}>
                <Tab.Pane eventKey="password" style={{ width: '660px',height:'470px' }}>
                <ChangeAdminPass />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>

    )


};
export default AdminSettings;