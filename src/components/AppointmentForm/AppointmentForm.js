import React, { useMemo, useState } from "react";
import "./AppointmentForm.css";

export default function AppointmentForm({ isOpen, doctor, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [futureDate, setFutureDate] = useState(""); // “book for coming dates”

  const today = new Date().toISOString().slice(0, 10);

  // Example slots; adjust as needed or replace with API data
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

  if (!isOpen) return null;

  const validate = () => {
    // Basic validation — expand as needed
    if (!name.trim()) return "Please enter patient name.";
    if (!phone.trim()) return "Please enter phone number.";
    if (!appointmentDate && !futureDate)
      return "Select Appointment Date or Future Date.";
    if (appointmentDate && appointmentDate < today)
      return "Appointment date cannot be in the past.";
    if (futureDate && futureDate < today)
      return "Future date cannot be in the past.";
    if (!appointmentTime && !timeSlot)
      return "Select Appointment Time or a Time Slot.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      alert(err);
      return;
    }
    const payload = {
      id: crypto.randomUUID(),
      doctorId: doctor?.id,
      doctorName: doctor?.name,
      name: name.trim(),
      phone: phone.trim(),
      // Use futureDate if provided; otherwise appointmentDate
      date: (futureDate || appointmentDate),
      time: appointmentTime || null,
      timeSlot: timeSlot || null,
      createdAt: Date.now(),
    };
    onSubmit?.(payload);
    onClose?.();
    // reset
    setName("");
    setPhone("");
    setAppointmentDate("");
    setAppointmentTime("");
    setTimeSlot("");
    setFutureDate("");
  };

  return (
    <div className="booking-form bg-white rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold mb-2">
        {doctor?.name} {doctor?.specialty ? `• ${doctor.specialty}` : ""}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Patient Name */}
        <div className="form-row">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Patient name"
            required
          />
        </div>

        {/* Phone */}
        <div className="form-row">
          <label className="form-label">Phone Number:</label>
          <input
            className="form-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            placeholder="(xx) xxxxx-xxxx"
            required
          />
        </div>

        {/* Appointment Date */}
        <div className="form-row">
          <label className="form-label">Date of Appointment:</label>
          <input
            type="date"
            className="form-input"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            min={today}
          />
        </div>

        {/* Appointment Time (free time) */}
        <div className="form-row">
          <label className="form-label">Appointment Time (HH:MM):</label>
          <input
            type="time"
            className="form-input"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          />
        </div>

        {/* ➕ Book Time Slot (extra element requested) */}
        <div className="form-row">
          <label className="form-label">Book Time Slot:</label>
          <select
            className="form-input"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Select a time slot</option>
            {slots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* ➕ Book for specified future date (extra element requested) */}
        <div className="form-row">
          <label className="form-label">Book for a future date:</label>
          <input
            type="date"
            className="form-input"
            value={futureDate}
            onChange={(e) => setFutureDate(e.target.value)}
            min={today}
          />
          <small className="text-muted">
            Optional — use this to schedule for upcoming dates. If you fill this,
            it overrides “Date of Appointment”.
          </small>
        </div>

        <div className="flex gap-2 justify-end pt-2">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
}
