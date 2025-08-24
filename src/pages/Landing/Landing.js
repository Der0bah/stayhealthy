// src/pages/Landing/Landing.js
import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="py-6">
      <div className="container">
        <h1 style={{ fontSize: "42px", lineHeight: 1.1, margin: "0 0 10px" }}>
          Your Health <span style={{ color: "var(--primary)" }}>Our Responsibility</span>
        </h1>
        <p className="muted" style={{ maxWidth: 720 }}>
          Take control of your health journey with our comprehensive platform.
        </p>

        {/* Replaced the InstantConsultationBooking form with simple CTAs */}
        <div className="mt-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" to="/instant-consultation">
            Start Instant Consultation
          </Link>
          <Link className="btn" to="/find-doctor">
            Find a Doctor
          </Link>
        </div>

        <div className="card mt-4">
          <h3>Your Trust, Our Priority</h3>
          <p>All reviews are verified and moderated to ensure authenticity…</p>
        </div>
      </div>
    </section>
  );
}
