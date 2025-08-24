import React, { useEffect, useState } from "react";
import "./Notification.css";

/**
 * Notification
 * Props:
 *  - appointment: {
 *      doctorName, specialty, name, phone, date, timeSlot
 *    }
 *  - show: boolean                  // initial visibility (default: false)
 *  - canceled: boolean              // set to true when a booking is canceled
 *  - onDismiss?: () => void         // callback when user closes / auto hides
 *  - autoHideMs?: number | null     // e.g., 6000 to auto-hide; null disables
 */
export default function Notification({
  appointment = {},
  show = false,
  canceled = false,
  onDismiss,
  autoHideMs = 6000,
}) {
  const [visible, setVisible] = useState(show);

  // Keep internal state in sync when parent toggles "show"
  useEffect(() => {
    setVisible(show);
  }, [show]);

  // 🔔 Hide when the parent signals a cancellation
  useEffect(() => {
    if (canceled && visible) {
      setVisible(false);
      onDismiss?.();
    }
  }, [canceled, visible, onDismiss]);

  // Optional auto-hide
  useEffect(() => {
    if (!visible || !autoHideMs) return;
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, autoHideMs);
    return () => clearTimeout(t);
  }, [visible, autoHideMs, onDismiss]);

  // Close on ESC
  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setVisible(false);
        onDismiss?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, onDismiss]);

  if (!visible) return null;

  const {
    doctorName = "Doctor",
    specialty = "Speciality",
    name = "—",
    phone = "—",
    date = "—",
    timeSlot = "—",
  } = appointment;

  return (
    <div className="notify-root" role="alert" aria-live="assertive">
      <div className="notify-card">
        <button
          className="notify-close"
          aria-label="Close notification"
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
        >
          ×
        </button>

        <h3 className="notify-title">Appointment Details</h3>

        <dl className="notify-list">
          <div>
            <dt>Doctor:</dt>
            <dd>{doctorName}</dd>
          </div>
          <div>
            <dt>Speciality:</dt>
            <dd>{specialty}</dd>
          </div>
          <div>
            <dt>Name:</dt>
            <dd>{name}</dd>
          </div>
          <div>
            <dt>Phone Number:</dt>
            <dd>{phone}</dd>
          </div>
          <div>
            <dt>Date of Appointment:</dt>
            <dd>{date}</dd>
          </div>
          <div>
            <dt>Time Slot:</dt>
            <dd>{timeSlot}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
