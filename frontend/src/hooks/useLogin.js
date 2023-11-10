import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate();

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`http://localhost:4000/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      console.log("token",json.token)
      // save the user to a cookie
      Cookies.set('token', json.token)

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
      if (json.role === 'patient') {
        navigate(`/getMedicines/${username}`);
      }else if(json.role === 'pharmacist'){
        navigate(`/getMedicines/pharmacist/${username}`);
      }
       else {
        navigate(`/admin/${username}`);
      }

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}