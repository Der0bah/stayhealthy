import React, { useMemo, useState } from "react";
import "./InstantConsultationBooking.css";

const phoneRe = /^[0-9+\-\s()]{8,}$/;

export default function InstantConsultationBooking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState({});
  const [booked, setBooked] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!phoneRe.test(phone)) e.phone = "Enter a valid phone number.";
    return e;
  }, [name, phone]);

  const hasErrors = Object.keys(errors).length > 0;

  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (hasErrors) return;
    setBooked(true);
  };

  const cancel = () => {
    setBooked(false);
    // keep name/phone so the user can edit; clear them if you prefer:
    // setName(""); setPhone(""); setTouched({});
  };

  // derived UI bits
  const Rating = () => (
    <div className="rating">
      <span className="label">Ratings:</span>
      {"★★★★★".split("").map((s, i) => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  );

  return (
    <div className="icb-card">
      {/* Avatar */}
      <div className="icb-avatar">
        {/* If you have a real image, replace the emoji or use /assets/doctor.png */}
        <div className="circle-avatar" aria-hidden>👩‍⚕️</div>
      </div>

      {/* Doctor Header */}
      <h2 className="icb-name">Dr. Jiao Yang</h2>
      <div className="icb-specialty">Dentist</div>
      <div className="icb-exp">9 years experience</div>
      <Rating />

      {/* Form → Booked state swap */}
      {!booked ? (
        <form className="icb-form" onSubmit={submit} noValidate>
          <label htmlFor="icb-name">Name:</label>
          <input
            id="icb-name"
            className="icb-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Enter your full name"
          />
          {touched.name && errors.name && (
            <small className="icb-error">{errors.name}</small>
          )}

          <label htmlFor="icb-phone">Phone Number:</label>
          <input
            id="icb-phone"
            className="icb-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            placeholder="Enter your phone number"
          />
          {touched.phone && errors.phone && (
            <small className="icb-error">{errors.phone}</small>
          )}

          <button className="icb-button" type="submit" disabled={hasErrors}>
            Book Now
          </button>
        </form>
      ) : (
        <div className="icb-booked">
          <h3 className="icb-booked-title">Appointment Booked!</h3>
          <div className="icb-booked-line"><strong>Name:</strong> {name}</div>
          <div className="icb-booked-line">
            <strong>Phone Number:</strong> {phone}
          </div>
          <button className="icb-button" onClick={cancel}>
            Cancel Appointment
          </button>
        </div>
      )}
    </div>
  );
}
