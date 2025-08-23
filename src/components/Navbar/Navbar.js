import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <header className="nav">
      <div className="container inner">
        <Link className="brand" to="/"><span className="dot"></span> StayHealthy</Link>
        <nav aria-label="main">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        <div className="auth">
          <Link className="btn btn-outline" to="/signup">Sign Up</Link>
          <Link className="btn btn-primary" to="/login">Login</Link>
        </div>
      </div>
    </header>
  );
}
