import { useState } from 'react';
import { login } from '../services/auth.js';
import useAuth from './useAuth.jsx';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    const data = await login(email, password);
    if (data.user) {
      console.log(data.user);
      authLogin(data.user, data.token);
      navigate('/');
    }
  };
  return { handleLogin, error, loading };
};

export default useLogin;