import { useEffect, useMemo, useState } from "react";

export default function DoctorCard({ doctor, onBooked, onCancelled }) {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", date: "", timeSlot: "" });

  const storageKey = `appointments_${doctor?.id ?? "unknown"}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setAppointments(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const persist = (next) => {
    setAppointments(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  };

  const today = new Date().toISOString().slice(0, 10);
  const slots = useMemo(() => [
    "09:00 – 09:30",
    "09:30 – 10:00",
    "10:00 – 10:30",
    "14:00 – 14:30",
    "14:30 – 15:00",
    "15:00 – 15:30",
  ], []);

  const handleBook = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.timeSlot) return;
    const appt = { id: crypto.randomUUID(), doctorId: doctor?.id, ...form, createdAt: Date.now() };
    persist([appt, ...appointments]);
    setShowForm(false);
    setForm({ name: "", phone: "", date: "", timeSlot: "" });
    onBooked?.(appt);
  };

  const handleCancel = (id) => {
    persist(appointments.filter((a) => a.id !== id));
    onCancelled?.({ id, doctorId: doctor?.id });
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card-header">
        <img src={doctor?.avatarUrl} alt={doctor?.name} className="doctor-card-avatar"/>
        <div>
          <h3>{doctor?.name}</h3>
          <div>{doctor?.specialty} • {doctor?.experienceYears} yrs</div>
          <div>⭐ {doctor?.rating}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <button onClick={() => setShowForm(true)}>Book Appointment</button>
      </div>

      {appointments.length > 0 && (
        <ul>
          {appointments.map((a) => (
            <li key={a.id}>
              {a.date} • {a.timeSlot} • {a.name}
              <button onClick={() => handleCancel(a.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <form onSubmit={handleBook}>
          <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))}/>
          <input placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({...f, phone:e.target.value}))}/>
          <input type="date" min={today} value={form.date} onChange={e => setForm(f => ({...f, date:e.target.value}))}/>
          <select value={form.timeSlot} onChange={e => setForm(f => ({...f, timeSlot:e.target.value}))}>
            <option value="">Select a slot</option>
            {slots.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button type="submit">Book Now</button>
        </form>
      )}
    </div>
  );
}
