import React, { useEffect, useMemo, useState } from "react";
import AppointmentForm from "../../AppointmentForm/AppointmentForm";
import "../../DoctorCard/doctor-card.css";

export default function DoctorCardIC({ doctor = {} }) {
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const {
    id = "unknown",
    name = "Dr. Jane Doe",
    specialty = "Dermatologist",
    experienceYears = 7,
    rating = 4.6,
    reviewsCount = 127,
    avatarUrl = "",
  } = doctor;

  const storageKey = `appointments_${id}`;
  useEffect(() => {
    try { const raw = localStorage.getItem(storageKey); if (raw) setAppointments(JSON.parse(raw)); } catch {}
  }, [storageKey]);

  const persist = (next) => { setAppointments(next); try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {} };
  const handleBooked = (payload) => persist([payload, ...appointments]);
  const handleCancel = (apptId) => persist(appointments.filter(a => a.id !== apptId));

  const initials = useMemo(() => {
    const parts = (name || "").split(" ").filter(Boolean);
    const first = parts[0]?.[0] || "D";
    const last = parts[parts.length - 1]?.[0] || "R";
    return (first + last).toUpperCase();
  }, [name]);

  const normalizeSrc = (src) => {
    if (!src) return null;
    if (/^https?:\/\//i.test(src)) return src;
    return `${process.env.PUBLIC_URL}/${String(src).replace(/^\/+/, "")}`;
  };

  const stars = useMemo(() => calcStars(rating), [rating]);

  return (
    <div className="dc-card">
      <div className="dc-top">
        {normalizeSrc(avatarUrl) ? (
          <img
            className="dc-avatar-img"
            src={normalizeSrc(avatarUrl)}
            alt={name}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : (
          <div className="dc-avatar">{initials}</div>
        )}

        <div className="dc-header">
          <h3 className="dc-name">{name}</h3>
          <div className="dc-specialty">{specialty}</div>
          <div className="dc-exp">{experienceYears} years experience</div>
        </div>
      </div>

      <div className="dc-rating">
        <Stars stars={stars} />
        <span className="dc-rating-num">{rating.toFixed(1)}</span>
        <span className="dc-reviews">({reviewsCount} reviews)</span>
      </div>

      <div className="dc-actions">
        <button className="dc-btn dc-btn-primary" onClick={() => setOpen(true)}>
          Book Appointment
        </button>
        <button className="dc-btn dc-btn-outline" onClick={() => alert("Profile coming soon")}>
          View Profile
        </button>
      </div>

      {appointments.length > 0 && (
        <div className="dc-appts">
          <ul>
            {appointments.map((a) => (
              <li key={a.id}>
                <span>
                  <strong>{a.date}</strong>
                  {a.timeSlot ? ` • ${a.timeSlot}` : ""}
                  {a.name ? ` • ${a.name}` : ""}
                </span>
                <button className="dc-cancel" onClick={() => handleCancel(a.id)}>Cancel</button>
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

/* Reuse helpers */
function calcStars(value) {
  const out = [];
  const v = Math.max(0, Math.min(5, value));
  const full = Math.floor(v);
  const decimal = v - full;
  for (let i = 0; i < full; i++) out.push("full");
  if (out.length < 5) {
    if (decimal >= 0.75) out.push("full");
    else if (decimal >= 0.25) out.push("half");
  }
  while (out.length < 5) out.push("empty");
  return out;
}
function Stars({ stars }) {
  return (
    <span className="dc-stars" aria-label={`Rating ${stars.filter(s=>s!=="empty").length} out of 5`}>
      {stars.map((t, i) => (
        <span key={i} className={`dc-star ${t}`}>★</span>
      ))}
    </span>
  );
}
