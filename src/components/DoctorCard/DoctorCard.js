import React, { useEffect, useState } from "react";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import "./doctor-card.css";

export default function DoctorCard({ doctor }) {
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
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
  const handleBooked = (payload) => persist([payload, ...appointments]);
  const handleCancel = (id) => persist(appointments.filter((a) => a.id !== id));

  const normalizeSrc = (src) => {
    const fallback = `${process.env.PUBLIC_URL}/images/doctors/jiaoyang.png`;
    if (!src) return fallback;
    if (/^https?:\/\//i.test(src)) return src;
    return `${process.env.PUBLIC_URL}/${String(src).replace(/^\/+/, "")}`;
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card-header">
        <img
          src={normalizeSrc(doctor?.avatarUrl)}
          alt={doctor?.name || "Doctor"}
          className="doctor-card-avatar"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `${process.env.PUBLIC_URL}/images/doctors/jiaoyang.png`;
          }}
        />
        <div>
          <h3 className="doctor-card-name">{doctor?.name}</h3>
          <div className="doctor-card-sub">{doctor?.specialty} • {doctor?.experienceYears} years</div>
          <div className="doctor-card-rating">Ratings: ⭐⭐⭐⭐</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>Book Appointment</button>
      </div>

      {appointments.length > 0 && (
        <div className="doctor-card-appointments">
          <h4>Your Appointments</h4>
          <ul className="doctor-card-appointments-list">
            {appointments.map((a) => (
              <li key={a.id} className="doctor-card-appointment-item">
                <span><strong>{a.date}</strong>{a.timeSlot ? ` • ${a.timeSlot}` : ""}{a.name ? ` • ${a.name}` : ""}</span>
                <button className="btn btn-ghost btn-sm" onClick={() => handleCancel(a.id)}>Cancel</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {open && (
        <AppointmentForm
          isOpen={open}
          doctor={doctor}
          onClose={() => setOpen(false)}
          onSubmit={handleBooked}
        />
      )}
    </div>
  );
}
