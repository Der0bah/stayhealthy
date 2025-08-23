// src/pages/Login/Login.js
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';          // ← line 13: useNavigate
import { useAuth } from '../../context/AuthContext';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  // line 11: state variables for managing form + UI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();                               // ← line 13

  const { login: ctxLogin } = useAuth(); // alias to avoid name clash

  const errors = useMemo(() => {
    const e = {};
    if (!emailRe.test(email)) e.email = 'Enter a valid email address.';
    if (password.length < 8) e.password = 'Password must be at least 8 characters.';
    return e;
  }, [email, password]);

  const hasErrors = Object.keys(errors).length > 0;

  // line 20: function named `login` that handles submit + (optional) server API call
  async function login(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (hasErrors) return;

    try {
      setLoading(true);

      // --- Example server call (replace with your real API endpoint) ---
      // const res = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // if (!res.ok) throw new Error('Unable to login');
      // const data = await res.json(); // { user: { email, name, ... } }

      // For now, delegate to AuthContext (works with localStorage signup flow)
      await ctxLogin({ email, password });

      // line 40: navigate to Home on success
      navigate('/');

      // Navbar will now show:  [Welcome, {emailBeforeAt}] [Logout]
      // (We already implemented this in Navbar by deriving from user.email)
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  }

  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  return (
    <section className="py-6">
      <div className="container" style={{ maxWidth: 520 }}>
        <h2>Login</h2>
        <p className="muted">Welcome back! Please sign in to your account.</p>
        {error && (
          <div
            className="card"
            style={{ borderColor: '#fecaca', background: '#fee2e2', color: '#991b1b', marginTop: 10 }}
          >
            {error}
          </div>
        )}

        <form className="mt-3" onSubmit={login} noValidate style={{ display: 'grid', gap: 12 }}>
          {/* lines 66-69: sample email input using the useState (line 11) */}
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            className="input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={onBlur}
          />
          {touched.email && errors.email && <small style={{ color: '#b91c1c' }}>{errors.email}</small>}

          {/* line 70: password field created similarly */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={onBlur}
          />
          {touched.password && errors.password && <small style={{ color: '#b91c1c' }}>{errors.password}</small>}

          <div className="row" style={{ justifyContent: 'space-between' }}>
            <label className="row" style={{ gap: 8 }}>
              <input type="checkbox" /> Remember me
            </label>
            <Link className="muted" to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading || hasErrors}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="muted mt-3">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </section>
  );
}
