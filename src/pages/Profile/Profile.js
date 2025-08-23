import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const phoneRe = /^[0-9+\-\s()]{8,}$/;

export default function Profile(){
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    address: user?.address || '',
    phone: user?.phone || '',
    age: user?.age || '',
    bloodGroup: user?.bloodGroup || '',
    medicalRecords: user?.medicalRecords || ''
  });
  const [touched, setTouched] = useState({});
  const [saved, setSaved] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.address.trim()) e.address = 'Address is required.';
    if (!phoneRe.test(form.phone)) e.phone = 'Enter a valid phone number.';
    const ageNum = Number(form.age);
    if (!ageNum || ageNum < 0 || ageNum > 120) e.age = 'Enter a valid age (0–120).';
    if (!form.bloodGroup) e.bloodGroup = 'Select blood group.';
    if (!form.medicalRecords.trim()) e.medicalRecords = 'Medical records are required.';
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ name:true,address:true,phone:true,age:true,bloodGroup:true,medicalRecords:true });
    if (hasErrors) return;
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <section className="py-6">
      <div className="container" style={{maxWidth:640}}>
        <h2>My Profile</h2>
        <p className="muted">Update your details used for appointments.</p>
        {saved && <div className="card mt-2" style={{borderColor:'#a7f3d0', background:'#ecfdf5', color:'#065f46'}}>Profile updated.</div>}

        <form className="mt-3" onSubmit={onSubmit} noValidate style={{display:'grid', gap:12}}>
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" className="input" value={form.name} onChange={onChange} onBlur={onBlur} />
          {touched.name && errors.name && <small style={{color:'#b91c1c'}}>{errors.name}</small>}

          <label htmlFor="address">Address</label>
          <input id="address" name="address" className="input" value={form.address} onChange={onChange} onBlur={onBlur} />
          {touched.address && errors.address && <small style={{color:'#b91c1c'}}>{errors.address}</small>}

          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" className="input" value={form.phone} onChange={onChange} onBlur={onBlur} />
          {touched.phone && errors.phone && <small style={{color:'#b91c1c'}}>{errors.phone}</small>}

          <label htmlFor="age">Age</label>
          <input id="age" name="age" type="number" className="input" value={form.age} onChange={onChange} onBlur={onBlur} />
          {touched.age && errors.age && <small style={{color:'#b91c1c'}}>{errors.age}</small>}

          <label htmlFor="bloodGroup">Blood Group</label>
          <select id="bloodGroup" name="bloodGroup" className="input" value={form.bloodGroup} onChange={onChange} onBlur={onBlur}>
            <option value="">Select</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option>
            <option>O+</option><option>O-</option>
          </select>
          {touched.bloodGroup && errors.bloodGroup && <small style={{color:'#b91c1c'}}>{errors.bloodGroup}</small>}

          <label htmlFor="medicalRecords">Existing Medical Records</label>
          <textarea id="medicalRecords" name="medicalRecords" rows="4" className="input"
                    value={form.medicalRecords} onChange={onChange} onBlur={onBlur}></textarea>
          {touched.medicalRecords && errors.medicalRecords && <small style={{color:'#b91c1c'}}>{errors.medicalRecords}</small>}

          <button className="btn btn-primary" type="submit" disabled={hasErrors}>Save</button>
        </form>
      </div>
    </section>
  );
}
