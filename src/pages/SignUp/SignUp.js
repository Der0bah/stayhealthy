import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[0-9+\-\s()]{8,}$/;

export default function SignUp(){
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ role:'', name:'', phone:'', email:'', password:'' });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState('');

  const errors = useMemo(() => {
    const e = {};
    if (!form.role) e.role = 'Please select a role.';
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!phoneRe.test(form.phone)) e.phone = 'Enter a valid phone number.';
    if (!emailRe.test(form.email)) e.email = 'Enter a valid email address.';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ role:true, name:true, phone:true, email:true, password:true });
    if (hasErrors) return;
    try{
      signup({ ...form, address:'', age:'', bloodGroup:'', medicalRecords:'' });
      navigate('/appointments');
    }catch(err){
      setError(err.message || 'Sign-up failed.');
    }
  };

  return (
    <section className="py-6">
      <div className="container" style={{maxWidth:560}}>
        <h2>Sign Up</h2>
        <p className="muted">Create your account to begin booking appointments.</p>
        {error && <div className="card" style={{borderColor:'#fecaca', background:'#fee2e2', color:'#991b1b', marginTop:10}}> {error} </div>}

        <form className="mt-3" onSubmit={onSubmit} noValidate style={{display:'grid', gap:12}}>
          <label htmlFor="role">Role</label>
          <select id="role" name="role" className="input" value={form.role} onChange={onChange} onBlur={onBlur}>
            <option value="">Select your role</option>
            <option>Patient</option>
            <option>Doctor</option>
            <option>Staff</option>
          </select>
          {touched.role && errors.role && <small style={{color:'#b91c1c'}}>{errors.role}</small>}

          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" className="input" value={form.name} onChange={onChange} onBlur={onBlur} placeholder="Enter your full name" />
          {touched.name && errors.name && <small style={{color:'#b91c1c'}}>{errors.name}</small>}

          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" className="input" value={form.phone} onChange={onChange} onBlur={onBlur} placeholder="Enter your phone number" />
          {touched.phone && errors.phone && <small style={{color:'#b91c1c'}}>{errors.phone}</small>}

          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" className="input" value={form.email} onChange={onChange} onBlur={onBlur} placeholder="Enter your email" />
          {touched.email && errors.email && <small style={{color:'#b91c1c'}}>{errors.email}</small>}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className="input" value={form.password} onChange={onChange} onBlur={onBlur} placeholder="Create a strong password" />
          {touched.password && errors.password && <small style={{color:'#b91c1c'}}>{errors.password}</small>}

          <div className="row mt-2">
            <button className="btn btn-primary" type="submit" disabled={hasErrors}>Submit</button>
            <button className="btn btn-outline" type="reset" onClick={() => { setForm({role:'',name:'',phone:'',email:'',password:''}); setTouched({}); setError(''); }}>Reset</button>
          </div>
        </form>

        <p className="muted mt-3">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </section>
  );
}
