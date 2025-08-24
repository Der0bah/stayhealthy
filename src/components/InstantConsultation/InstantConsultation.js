import React, { useMemo, useState } from "react";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";
import "./InstantConsultation.css";

const SPECIALTY_EMOJI = {
  "Dentist": "🦷",
  "Gynecologist/obstetrician": "👶",
  "General Physician": "🩺",
  "Dermatologist": "🧴",
  "Ear-nose-throat (ent) Specialist": "👂",
  "Homeopath": "🌿",
  "Ayurveda": "🪔",
  "Cardiologist": "❤️",
  "Orthopedist": "🦴",
  "Neurologist": "🧠",
};

export default function InstantConsultation() {
  const [q, setQ] = useState("");

  // Example doctor data; your app likely pulls this from props/context
  const doctors = useMemo(
    () => [
      { id: "d1", name: "Dr. Jiao Yang", specialty: "Dentist", experienceYears: 9, rating: 4.8, reviewsCount: 127 },
      { id: "d2", name: "Dr. Jane Smith", specialty: "Dermatologist", experienceYears: 7, rating: 4.6, reviewsCount: 127 },
      { id: "d3", name: "Dr. John Doe", specialty: "Cardiologist", experienceYears: 12, rating: 4.9, reviewsCount: 127 },
    ],
    []
  );

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    if (!text) return doctors;
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(text) ||
        (d.specialty || "").toLowerCase().includes(text)
    );
  }, [q, doctors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional: trigger analytics or remote search
  };

  return (
    <section className="ic-wrap container">
      <h2 className="ic-title">Find a doctor and Consult instantly</h2>

      {/* Search: same behaviour as FindDoctor (form + magnifier) */}
      <form className="ic-search" onSubmit={handleSubmit}>
        <input
          className="ic-search-input"
          placeholder="Search doctors, clinics, hospitals, etc."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search"
        />
        <button type="submit" className="ic-search-button" aria-label="Search">
          🔎
        </button>
      </form>

      {/* Optional specialty quick list WITH EMOJIS */}
      <div className="ic-specialties">
        {[
          "Dentist",
          "Gynecologist/obstetrician",
          "General Physician",
          "Dermatologist",
          "Ear-nose-throat (ent) Specialist",
          "Homeopath",
          "Ayurveda",
        ].map((s) => (
          <button
            key={s}
            className="ic-chip"
            onClick={() => setQ(s)}
            title={s}
          >
            <span className="ic-chip-emoji">{SPECIALTY_EMOJI[s] || "👤"}</span>
            <span className="ic-chip-label">{s}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="ic-grid">
        {filtered.map((doc) => (
          <div key={doc.id} className="ic-row">
            {/* Emoji before specialty (like FindDoctor list style) */}
            <span className="ic-row-emoji">
              {SPECIALTY_EMOJI[doc.specialty] || "👤"}
            </span>
            <div className="ic-row-card">
              <DoctorCardIC doctor={doc} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
