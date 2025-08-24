// src/components/DoctorCard/DoctorCard.js
import React, { useEffect, useMemo, useState } from "react";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

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

  const handleBooked = (payload) => {
    persist([payload, ...appointments]);
  };

  const handleCancel = (id) => {
    persist(appointments.filter((a) => a.id !== id));
  };

  return (
    <div className="doctor-card">
      {/* Card header (avatar, name, specialty, rating, etc.) */}
      <div className="doctor-card-header">
        <div className="doctor-card-avatar" aria-hidden />
        <div>
          <h3 className="doctor-card-name">{doctor?.name}</h3>
          <div className="doctor-card-sub">
            {doctor?.specialty} • {doctor?.experienceYears} years
          </div>
          <div className="doctor-card-rating">Ratings: ⭐⭐⭐⭐</div>
        </div>
      </div>

      {/* Same container class used by IC variant */}
      <div className="doctor-card-options-container">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Book Appointment
        </button>
      </div>

      {/* Existing appointments list with cancel */}
      {appointments.length > 0 && (
        <div className="doctor-card-appointments">
          <h4>Your Appointments</h4>
          <ul className="doctor-card-appointments-list">
            {appointments.map((a) => (
              <li key={a.id} className="doctor-card-appointment-item">
                <span>
                  <strong>{a.date}</strong>
                  {a.time ? ` • ${a.time}` : ""}
                  {a.timeSlot ? ` • ${a.timeSlot}` : ""}
                  {a.name ? ` • ${a.name}` : ""}
                </span>
                <button className="btn btn-ghost btn-sm" onClick={() => handleCancel(a.id)}>
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Booking Form (modal or inline) */}
      {open && (
        <div className="doctor-card-booking-modal">
          <AppointmentForm
            isOpen={open}
            doctor={doctor}
            onClose={() => setOpen(false)}
            onSubmit={handleBooked}
          />
        </div>
      )}
    </div>
  );
}
