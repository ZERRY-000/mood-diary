import { useState } from 'react';
import useLogin from '../hooks/useLogin.js';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, error, loading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
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