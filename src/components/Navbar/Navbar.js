import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // derive username from email before '@'
  const userEmail = user?.email || '';
  const friendlyName = userEmail ? userEmail.split('@')[0] : '';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="nav">
      <div className="container inner">
        {/* Brand */}
        <Link className="brand" to="/">
          <span className="dot"></span> StayHealthy
        </Link>

        {/* Main Navigation */}
        <nav aria-label="main">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/instant-consultation">Instant Consultation</Link></li>
            <li><Link to="/find-doctor">Find Doctor</Link></li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="auth">
          {!user ? (
            <>
              <Link className="btn-outline btn" to="/signup">Sign Up</Link>
              <Link className="btn btn-primary" to="/login">Login</Link>
            </>
          ) : (
            <>
              <span className="muted" style={{ marginRight: '12px' }}>
                Welcome, {friendlyName}
              </span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
