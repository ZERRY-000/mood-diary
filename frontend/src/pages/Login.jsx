import { useState } from 'react';
import { login } from '../services/auth.js';
import useAuth from '../hooks/useAuth.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    console.log(data); // ดู response ก่อน
    if (data.token) {
      authLogin(data.user, data.token);
      alert('Login OK');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;