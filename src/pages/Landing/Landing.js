import React from "react";
import { Link } from "react-router-dom";
import InstantConsultationBooking from "../../components/InstantConsultation/InstantConsultationBooking";

export default function Landing(){
  return (
    <section className="py-6">
      <div className="container">
        <h1 style={{fontSize:"42px",lineHeight:1.1,margin:"0 0 10px"}}>
          Your Health <span style={{color:"var(--primary)"}}>Our Responsibility</span>
        </h1>
        <p className="muted" style={{maxWidth:720}}>
          Take control of your health journey with our comprehensive platform.
        </p>

        {/* Instant Consultation Booking card */}
        <InstantConsultationBooking />

        <div className="card mt-4">
          <h3>Your Trust, Our Priority</h3>
          <p>All reviews are verified and moderated to ensure authenticity…</p>
        </div>
      </div>
    </section>
  );
}
