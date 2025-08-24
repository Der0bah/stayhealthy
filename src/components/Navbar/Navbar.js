import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);        // mobile burger menu
  const [menuOpen, setMenuOpen] = useState(false); // user dropdown
  const [displayName, setDisplayName] = useState("User");
  const navRef = useRef(null);
  const navigate = useNavigate();

  // Read user name once from sessionStorage (fallback to email prefix)
  useEffect(() => {
    const n = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    if (n && n.trim()) setDisplayName(n.split(" ")[0]);
    else if (email) setDisplayName(String(email).split("@")[0]);
  }, []);

  // Close dropdown on outside click / ESC
  useEffect(() => {
    function onDocClick(e) {
      if (!menuOpen) return;
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    // clear anything you store
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("phone");
    // optionally clear others…
    navigate("/login");
  };

  return (
    <header className="sh-navbar" ref={navRef}>
      <div className="sh-nav-inner">
        <Link to="/" className="sh-brand" onClick={() => { setOpen(false); setMenuOpen(false); }}>
          <span className="sh-brand-dot">●</span> <span>StayHealthy</span>
        </Link>

        {/* Burger for mobile */}
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
          <NavLink to="/" end onClick={() => { setOpen(false); setMenuOpen(false); }}>
            Home
          </NavLink>
          <NavLink to="/appointments" onClick={() => { setOpen(false); setMenuOpen(false); }}>
            Appointments
          </NavLink>
          <NavLink to="/instant-consultation" onClick={() => { setOpen(false); setMenuOpen(false); }}>
            Instant Consultation
          </NavLink>
          <NavLink to="/find-doctor" onClick={() => { setOpen(false); setMenuOpen(false); }}>
            Find Doctor
          </NavLink>
          <NavLink to="/reviews" onClick={() => { setOpen(false); setMenuOpen(false); }}>
            Reviews
          </NavLink>

          {/* Right cluster: user dropdown + logout */}
          <div className="sh-right">
            {/* User dropdown */}
            <div className="sh-user">
              <button
                className="sh-user-btn"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="sh-user-greet">Welcome,</span>
                <span className="sh-user-name">{displayName}</span>
                <span className="sh-user-caret">▾</span>
              </button>

              {menuOpen && (
                <div className="sh-menu" role="menu">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => `sh-menu-item${isActive ? " active" : ""}`}
                    role="menuitem"
                    onClick={() => { setMenuOpen(false); setOpen(false); }}
                    end
                  >
                    Your Profile
                  </NavLink>

                  <NavLink
                    to="/reports"
                    className={({ isActive }) => `sh-menu-item${isActive ? " active" : ""}`}
                    role="menuitem"
                    onClick={() => { setMenuOpen(false); setOpen(false); }}
                  >
                    Your Reports
                  </NavLink>
                </div>
              )}
            </div>

            {/* Logout button */}
            <button className="sh-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
