
import React from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorCard.css";

export function DoctorCard({
  name,
  specialty,
  experienceYears,
  rating = 5,
  image,
  profile,
}) {
  const navigate = useNavigate();

  const stars = Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      className={`dc-star ${i < rating ? "is-on" : ""}`}
      aria-hidden="true"
    >
      ★
    </span>
  ));

  const handleBook = () => {
    // Send doctor info to the new appointment form
    navigate("/appointments/new", { state: { doctor: name, specialty } });
  };

  return (
    <article className="dc-card" role="region" aria-label={`Doctor ${name}`}>
      <div className="dc-card-inner">
        <div className="dc-avatar">
          {image ? (
            <img src={image} alt={`Dr. ${name}`} />
          ) : (
            <div className="dc-avatar-fallback" aria-hidden>
              👨‍⚕️
            </div>
          )}
        </div>

        <div className="dc-info">
          <h3 className="dc-name">Dr. {name}</h3>
          <div className="dc-specialty">{specialty}</div>
          <div className="dc-exp">
            <strong>{experienceYears}</strong> years experience
          </div>
          <div className="dc-ratings">
            <span className="dc-ratings-label">Ratings:</span> {stars}
          </div>
          {profile && <p className="dc-profile">{profile}</p>}
        </div>
      </div>

      <button type="button" className="dc-book-btn" onClick={handleBook}>
        Book Appointment
        <br />
        <span className="dc-book-sub">No Booking Fee</span>
      </button>
    </article>
  );
}

export default function DoctorCardsGrid() {
  const doctors = [
    {
      name: "Jiao Yang",
      specialty: "Dentist",
      experienceYears: 9,
      rating: 5,
      image: "",
      profile:
        "Gentle dentist focused on preventive care and minimally invasive treatments.",
    },
    {
      name: "Denis Raj",
      specialty: "Dentist",
      experienceYears: 24,
      rating: 5,
      image: "",
      profile:
        "Senior dentist specializing in cosmetic dentistry and complex restorations.",
    },
    {
      name: "Lyn Christie",
      specialty: "Dentist",
      experienceYears: 11,
      rating: 4,
      image: "",
      profile:
        "Family dentist with strong emphasis on patient education and comfort.",
    },
  ];

  return (
    <section className="dc-grid-wrap">
      <div className="dc-grid-header">
        <h2>
          <strong>{doctors.length} doctors</strong> available in
        </h2>
        <p className="dc-grid-sub">
          Book appointments with minimum wait-time &amp; verified doctor details
        </p>
      </div>

      <div className="dc-grid">
        {doctors.map((d) => (
          <DoctorCard key={d.name} {...d} />
        ))}
      </div>
    </section>
  );
}
