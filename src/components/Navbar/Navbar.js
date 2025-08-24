import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sh-navbar">
      <div className="sh-nav-inner">
        <Link to="/" className="sh-brand">
          <span className="sh-brand-dot">●</span> <span>StayHealthy</span>
        </Link>

        {/* Burger */}
        <button
          className="sh-burger"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sh-burger-bar" />
          <span className="sh-burger-bar" />
          <span className="sh-burger-bar" />
        </button>

        {/* Links */}
        <nav className={`sh-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/appointments" onClick={() => setOpen(false)}>
            Appointments
          </NavLink>
          <NavLink to="/instant-consultation" onClick={() => setOpen(false)}>
            Instant Consultation
          </NavLink>
          <NavLink to="/find-doctor" onClick={() => setOpen(false)}>
            Find Doctor
          </NavLink>

          {/* ⭐ New Reviews link */}
          <NavLink to="/reviews" onClick={() => setOpen(false)}>
            Reviews
          </NavLink>

          {/* Right cluster (auth) */}
          <div className="sh-auth">
            <span className="sh-welcome">
              Welcome,{" "}
              <Link to="/signup" onClick={() => setOpen(false)}>
                signup
              </Link>
            </span>
            <Link className="sh-logout" to="/logout" onClick={() => setOpen(false)}>
              Logout
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
