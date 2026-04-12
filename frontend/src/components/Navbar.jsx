import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        <div className="navbar-avatar">{user?.username}</div>
        <button className="navbar-logout" onClick={handleLogout}>logout</button>
      </div>
    </nav>
  );
};

export default Navbar;