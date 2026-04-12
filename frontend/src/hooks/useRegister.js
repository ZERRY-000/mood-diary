import { useState } from 'react';
import { register } from '../services/auth.js';
import { useNavigate } from 'react-router-dom';

function useRegister() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(username, email, password) {
    setLoading(true);
    setError(null);
    const data = await register(username, email, password);
    console.log(data);
    if(data.success) {
      navigate('/');
    }
  }

  return {handleRegister, error, loading}

}

export default useRegister;