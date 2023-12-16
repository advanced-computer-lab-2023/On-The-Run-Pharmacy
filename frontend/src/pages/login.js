import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from "react-router-dom";
import { Card, Form, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCapsules } from '@fortawesome/free-solid-svg-icons'
const Login = () => {
  const { user } = useAuthContext()
  const [usernamee, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(usernamee === '' || password === '') {
      alert('Please fill in all fields')
      return
    }

    await login(usernamee, password);
  }

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', flexDirection: 'column' }}>
      <Card style={{ height: '420px', width: '500px', boxShadow: '0 0 10px rgba(0,0,0,0.5)', marginBottom: '10px' }}>
        <Card.Body>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '10px' }}>
        <FontAwesomeIcon icon={faCapsules} style={{ height: '40px', marginRight: 'px', marginBottom: '10px', color: '#095d7e'}} />  <h2 style={{ fontSize: '25px', fontWeight: '600', color: '#095d7e', marginBottom: '10px',textAlign: 'left' }}>On-The-Run</h2>
</div>
          <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#343a40', marginBottom: '15px', textAlign: 'left' }}>Welcome back!</h4>
          <Form onSubmit={handleSubmit}>
          {error && (
                <div className="alert alert-danger" role="alert" style={{ fontSize: '12px' }}>
                  {error}
                </div>
              )}

            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ fontSize: '13px', color: '#495057', fontWeight: '600', textAlign: 'left' }}>Username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
              <Form.Control style={{ maxWidth: '400px' }} type="text" placeholder="Enter username" value={usernamee} onChange={(e) => setUsername(e.target.value)} className="placeholderStyle" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ fontSize: '13px', color: '#495057', fontWeight: '600', textAlign: 'left' }}>Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
              <Form.Control style={{ maxWidth: '400px' }} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="placeholderStyle" />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ width: '100%' }} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Log In'}
            </Button>
            <br />
            <Link to='/forgetPassword' style={{ fontSize: '13px', color: '#8a90a2', fontWeight: '400', textAlign: 'left' }}> Forgot Password?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login