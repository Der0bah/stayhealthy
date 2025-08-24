import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Appointment booking form
 * - Reads doctor info from location.state (sent by DoctorCard button)
 * - Validates: name, phone, date (not past), time slot
 * - Blocks submit until valid
 */
const phoneRe = /^[0-9+\-\s()]{8,}$/;

export default function AppointmentForm() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const doctorName = state?.doctor || "Selected Doctor";
  const specialty = state?.specialty || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  // time slot options – adjust as needed
  const slots = [
    "09:00 – 09:30",
    "09:30 – 10:00",
    "10:00 – 10:30",
    "11:00 – 11:30",
    "14:00 – 14:30",
    "15:30 – 16:00",
  ];

  // min date = today for “coming dates”
  const todayStr = useMemo(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  // derived errors
  const errors = useMemo(() => {
    const e = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!phoneRe.test(phone)) e.phone = "Enter a valid phone number.";
    if (!date) e.date = "Please select a date.";
    else if (date < todayStr) e.date = "Date cannot be in the past.";
    if (!slot) e.slot = "Please choose a time slot.";
    return e;
  }, [name, phone, date, slot, todayStr]);

  const hasErrors = Object.keys(errors).length > 0;

  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const submit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, date: true, slot: true });
    if (hasErrors) return;

    try {
      setSubmitting(true);
      // TODO: call your backend API here
      // await fetch('/api/appointments', { method:'POST', ... })

      // Simple success notice
      setNotice(
        `Appointment booked with Dr. ${doctorName} on ${date} at ${slot}.`
      );

      // Optionally navigate to a confirmation page after a pause
      // setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      setNotice("Failed to book appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-6">
      <div className="container" style={{ maxWidth: 520 }}>
        {/* Doctor header */}
        <h2 style={{ textAlign: "center", marginBottom: 0 }}>
          Dr. {doctorName}
        </h2>
        {specialty && (
          <div style={{ textAlign: "center", color: "#374151" }}>{specialty}</div>
        )}
        <div
          style={{
            textAlign: "center",
            color: "#9aa3af",
            fontWeight: 700,
            marginTop: 4,
            marginBottom: 8,
          }}
        >
          Ratings: <span style={{ color: "#f4c430" }}>★ ★ ★ ★ ★</span>
        </div>

        <form className="card" onSubmit={submit} noValidate style={{ padding: 16 }}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            className="input"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={onBlur}
          />
          {touched.name && errors.name && (
            <small style={{ color: "#b91c1c" }}>{errors.name}</small>
          )}

          <div style={{ height: 10 }} />

          <label htmlFor="phone">Phone Number:</label>
          <input
            id="phone"
            name="phone"
            className="input"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={onBlur}
          />
          {touched.phone && errors.phone && (
            <small style={{ color: "#b91c1c" }}>{errors.phone}</small>
          )}

          <div style={{ height: 10 }} />

          {/* Date for coming days */}
          <label htmlFor="date">Date of Appointment:</label>
          <input
            id="date"
            name="date"
            type="date"
            className="input"
            min={todayStr}         // ⬅ ensure coming dates only
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onBlur={onBlur}
          />
          {touched.date && errors.date && (
            <small style={{ color: "#b91c1c" }}>{errors.date}</small>
          )}

          <div style={{ height: 10 }} />

          {/* Time slot selection */}
          <label htmlFor="slot">Book Time Slot:</label>
          <select
            id="slot"
            name="slot"
            className="input"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            onBlur={onBlur}
          >
            <option value="">Select a time slot</option>
            {slots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {touched.slot && errors.slot && (
            <small style={{ color: "#b91c1c" }}>{errors.slot}</small>
          )}

          <div style={{ height: 16 }} />

          <button className="btn btn-primary" type="submit" disabled={submitting || hasErrors}>
            {submitting ? "Booking…" : "Book Now"}
          </button>
        </form>

        {notice && (
          <div
            className="card"
            style={{ marginTop: 12, borderColor: "#d1fae5", background: "#ecfdf5", color: "#065f46" }}
          >
            {notice}
          </div>
        )}
      </div>
    </section>
  );
}
