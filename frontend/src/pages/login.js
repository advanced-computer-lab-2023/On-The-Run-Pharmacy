import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import './login.css' // Import your CSS file

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
    <form className="login" onSubmit={handleSubmit}>
  

      <h3>Log In</h3>
      
      <label>Username:</label>
      <input 
        type="usernamee" 
        onChange={(e) => setUsername(e.target.value)} 
        value={usernamee} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
         {error && <p className="error">Wrong username or password</p>}

         <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Log in'}</button>
      <Link to={`/forgetPassword`}>Forgot Password?</Link>
    </form>
  )
}

export default Login