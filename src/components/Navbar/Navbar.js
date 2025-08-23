import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // derive username from email before '@'
  const userEmail = user?.email || '';
  const friendly = userEmail ? userEmail.split('@')[0] : '';

  const handleLogout = () => {
    logout();
    navigate('/'); // back to home after logout
  };

  return (
    <header className="nav">
      <div className="container inner">
        <Link className="brand" to="/"><span className="dot"></span> StayHealthy</Link>

        <nav aria-label="main">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
          </ul>
        </nav>

        <div className="auth">
          {!user ? (
            <>
              <Link className="btn btn-outline" to="/signup">Sign Up</Link>
              <Link className="btn btn-primary" to="/login">Login</Link>
            </>
          ) : (
            <>
              {/* welcome text at the left side of the Logout button */}
              <span className="muted" style={{marginRight:8}}>Welcome, {friendly}</span>
              <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
