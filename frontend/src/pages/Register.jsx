import useRegister from "../hooks/useRegister";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleRegister, error, loading } = useRegister();

  function handleToRegister() {
    navigate('/login');
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(username, email, password);
  }

  return (
    <div className="login-wrapper">
      <div className='login-leftside'>
        {/* <h1 className='light login-header-1'>Mood diary</h1> */}
        <h3 className='light login-header-3'>Register</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
          <button type="submit">Next</button>
          <div className='login-to-register' onClick={handleToRegister}>Do you have an account? Login Here.</div>
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
  )
}
export default Register;