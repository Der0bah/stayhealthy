import React, { useMemo, useState } from "react";
import "./AppointmentForm.css";

export default function AppointmentForm({ isOpen, doctor, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  if (!isOpen) return null;

  const today = new Date().toISOString().slice(0, 10);
  const slots = useMemo(
    () => [
      "09:00 – 09:30",
      "09:30 – 10:00",
      "10:00 – 10:30",
      "14:00 – 14:30",
      "14:30 – 15:00",
      "15:00 – 15:30",
    ],
    []
  );

  const normalizeSrc = (src) => {
    const fallback = `${process.env.PUBLIC_URL}/images/doctors/jiaoyang.png`;
    if (!src) return fallback;
    if (/^https?:\/\//i.test(src)) return src;
    return `${process.env.PUBLIC_URL}/${String(src).replace(/^\/+/, "")}`;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter patient name.");
    if (!phone.trim()) return alert("Please enter phone number.");
    if (!appointmentDate) return alert("Please select appointment date.");
    if (!timeSlot) return alert("Please select a time slot.");

    const payload = {
      id: crypto.randomUUID(),
      doctorId: doctor?.id,
      doctorName: doctor?.name,
      name: name.trim(),
      phone: phone.trim(),
      date: appointmentDate,
      timeSlot,
      createdAt: Date.now(),
    };
    onSubmit?.(payload);
    onClose?.();
    setName("");
    setPhone("");
    setAppointmentDate("");
    setTimeSlot("");
  };

  return (
    <div className="booking-modal-overlay" role="dialog" aria-modal="true">
      <div className="booking-modal-card">
        <div className="booking-modal-header">
          <img
            className="booking-doctor-avatar"
            src={normalizeSrc(doctor?.avatarUrl)}
            alt={doctor?.name || "Doctor"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `${process.env.PUBLIC_URL}/images/doctors/jiaoyang.png`;
            }}
          />
          <div className="booking-doc-meta">
            <h2 className="booking-doc-name">{doctor?.name}</h2>
            {doctor?.specialty && (
              <div className="booking-doc-spec">{doctor.specialty}</div>
            )}
            {doctor?.experienceYears != null && (
              <div className="booking-doc-exp">
                {doctor.experienceYears} years experience
              </div>
            )}
            <div className="booking-doc-rating">Ratings: ⭐⭐⭐⭐</div>
          </div>
        </div>

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
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="booking-form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
