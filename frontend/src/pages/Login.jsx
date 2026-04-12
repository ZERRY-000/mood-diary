import { useState } from 'react';
import { login } from '../services/auth.js';
import useAuth from '../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    console.log(data);
    if (data.token) {
      authLogin(data.user, data.token);
      alert('Login OK');
      navigate('/');
    }
  };

  return (
    <div className="login-wrapper">
      <div className='login-leftside'> 
        {/* <h1 className='light login-header-1'>Mood diary</h1> */}
        <h3 className='light login-header-3'>Login</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
          <button type="submit">Next</button>
        </form>
      </div>
      <div className='login-rightside'>
        <div className='login-decorate light'>
          <h3 className='light'>Mood Diary</h3>
          <div className='thin text-xl'>keep noticing your feelings</div>
          <div className='thin text-base'>- Ihave.n01dea</div>
        </div>
      </div>
    </div>
  );
};

export default Login;