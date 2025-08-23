import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login(){
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState('');

  const errors = useMemo(() => {
    const e = {};
    if (!emailRe.test(form.email)) e.email = 'Enter a valid email address.';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (hasErrors) return;
    try{
      login({ email: form.email, password: form.password });
      navigate('/appointments');
    }catch(err){
      setError(err.message || 'Invalid credentials.');
    }
  };

  return (
    <section className="py-6">
      <div className="container" style={{maxWidth:520}}>
        <h2>Login</h2>
        <p className="muted">Welcome back! Please sign in to your account.</p>
        {error && <div className="card" style={{borderColor:'#fecaca', background:'#fee2e2', color:'#991b1b', marginTop:10}}> {error} </div>}

        <form className="mt-3" onSubmit={onSubmit} noValidate style={{display:'grid', gap:12}}>
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" className="input" value={form.email} onChange={onChange} onBlur={onBlur} placeholder="Enter your email" />
          {touched.email && errors.email && <small style={{color:'#b91c1c'}}>{errors.email}</small>}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className="input" value={form.password} onChange={onChange} onBlur={onBlur} placeholder="Enter your password" />
          {touched.password && errors.password && <small style={{color:'#b91c1c'}}>{errors.password}</small>}

          <div className="row" style={{justifyContent:'space-between'}}>
            <label className="row" style={{gap:8}}><input type="checkbox" /> Remember me</label>
            <Link className="muted" to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="btn btn-primary" type="submit" disabled={hasErrors}>Sign In</button>
        </form>

        <p className="muted mt-3">Don’t have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </section>
  );
}
