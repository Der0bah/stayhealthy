import React, { useMemo, useState } from "react";
import "./AppointmentForm.css";
// Reuse the exact DoctorCard styles
import "../DoctorCard/doctor-card.css";

export default function AppointmentForm({ isOpen, doctor = {}, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  if (!isOpen) return null;

  const {
    id = "unknown",
    name: docName = "Dr. Jane Doe",
    specialty = "Dermatologist",
    experienceYears = 7,
    rating = 4.6,
    reviewsCount = 127,
    avatarUrl = "",
  } = doctor;

  const today = new Date().toISOString().slice(0, 10);
  const slots = useMemo(
    () => ["09:00 – 09:30", "09:30 – 10:00", "10:00 – 10:30", "14:00 – 14:30", "14:30 – 15:00", "15:00 – 15:30"],
    []
  );

  // Use the same visual avatar logic as the card (blue initials circle if no photo)
  const initials = useMemo(() => {
    const parts = (docName || "").split(" ").filter(Boolean);
    const first = parts[0]?.[0] || "D";
    const last = parts[parts.length - 1]?.[0] || "R";
    return (first + last).toUpperCase();
  }, [docName]);

  const normalizeSrc = (src) => {
    if (!src) return null;
    if (/^https?:\/\//i.test(src)) return src;
    return `${process.env.PUBLIC_URL}/${String(src).replace(/^\/+/, "")}`;
  };

  const stars = useMemo(() => calcStars(rating), [rating]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter patient name.");
    if (!phone.trim()) return alert("Please enter phone number.");
    if (!appointmentDate) return alert("Please select appointment date.");
    if (!timeSlot) return alert("Please select a time slot.");

    const payload = {
      id: crypto.randomUUID(),
      doctorId: id,
      doctorName: docName,
      name: name.trim(),
      phone: phone.trim(),
      date: appointmentDate,
      timeSlot,
      createdAt: Date.now(),
    };
    onSubmit?.(payload);
    onClose?.();
    setName(""); setPhone(""); setAppointmentDate(""); setTimeSlot("");
  };

  return (
    <div className="booking-modal-overlay" role="dialog" aria-modal="true">
      <div className="booking-modal-card">
        {/* -------- header block styled exactly like the card -------- */}
        <div className="dc-top appt-header">
          {normalizeSrc(avatarUrl) ? (
            <img
              className="dc-avatar-img"
              src={normalizeSrc(avatarUrl)}
              alt={docName}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <div className="dc-avatar">{initials}</div>
          )}

          <div className="dc-header">
            <h3 className="dc-name">{docName}</h3>
            <div className="dc-specialty">{specialty}</div>
            <div className="dc-exp">{experienceYears} years experience</div>
          </div>
        </div>

        <div className="dc-rating appt-rating">
          <Stars stars={stars} />
          <span className="dc-rating-num">{Number(rating || 0).toFixed(1)}</span>
          <span className="dc-reviews">({reviewsCount} reviews)</span>
        </div>
        {/* ----------------------------------------------------------- */}

        <form className="booking-form" onSubmit={submit}>
          <div className="form-row">
            <label className="form-label">Name:</label>
            <input
              className="form-input"
              placeholder="Patient name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">Phone Number:</label>
            <input
              className="form-input"
              placeholder="(xx) xxxxx-xxxx"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">Date of Appointment:</label>
            <input
              type="date"
              className="form-input"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={today}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">Book Time Slot:</label>
            <select
              className="form-input"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            >
              <option value="">Select a time slot</option>
              {slots.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="booking-form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Close</button>
            <button type="submit" className="btn btn-primary">Book Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- stars helpers (same logic as the card) ---------- */
function calcStars(value) {
  const out = [];
  const v = Math.max(0, Math.min(5, value || 0));
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
