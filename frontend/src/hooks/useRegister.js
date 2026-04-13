import { useState } from 'react';
import { register } from '../services/auth.js';
import { useNavigate } from 'react-router-dom';
import useAuth from "./useAuth.jsx";

function useRegister() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(username, email, password) {
    setLoading(true);
    setError(null);
    const data = await register(username, email, password);
    if(data.user) {
      authLogin(data.user, data.token);
      navigate('/');
    }
  }

  return {handleRegister, error, loading}

}

export default useRegister;