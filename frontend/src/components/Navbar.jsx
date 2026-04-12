import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import './Navbar.css';
import { useEffect, useState } from 'react';
import { getMe, logout } from '../services/auth.js';

const Navbar = () => {
  const { user: authUser, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 

  const handleLogout = () => {
    logout();
    authLogout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getMe();
      setUserData(userData?.data);

    };
    fetchUserData();
    
  }, []);
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        mood<span>diary</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/Dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Dashboard
        </NavLink>
      </div>

      <div className="navbar-right">
        <div className="navbar-avatar">{userData?.username}</div>
        {userData?.username ? (
          <button className="navbar-logout" onClick={handleLogout}>
            logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Login
          </NavLink>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;