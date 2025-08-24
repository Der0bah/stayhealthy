import React, { useMemo, useState } from "react";
import "./FindDoctorSearch.css";

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

export default function FindDoctorSearch({ items = [], onSearch }) {
  const [q, setQ] = useState("");

  // fallback list if none passed
  const data = items.length
    ? items
    : useMemo(
        () => [
          "Dentist",
          "Gynecologist/obstetrician",
          "General Physician",
          "Dermatologist",
          "Ear-nose-throat (ent) Specialist",
          "Homeopath",
          "Ayurveda",
        ],
        []
      );

  const filtered = useMemo(
    () => data.filter((s) => s.toLowerCase().includes(q.trim().toLowerCase())),
    [q, data]
  );

  // Mirror Instant Consultation behaviour:
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(q.trim());
  };

  return (
    <div className="fds-wrapper">
      {/* Search input wrapped in a form so Enter triggers submit */}
      <form className="fds-search" onSubmit={handleSubmit}>
        <input
          className="fds-input"
          placeholder="Search doctors, clinics, hospitals, etc."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search"
        />
        <button className="fds-search-btn" aria-label="Search" type="submit">
          🔎
        </button>
      </form>

      {/* Specialty list with emojis */}
      <div className="fds-list">
        {filtered.map((label) => (
          <div key={label} className="fds-row">
            <div className="fds-left">
              <span className="fds-emoji">{SPECIALTY_EMOJI[label] || "👤"}</span>
              <span className="fds-name">{label}</span>
            </div>
            <span className="fds-tag">SPECIALITY</span>
          </div>
        ))}
      </div>
    </div>
  );
}
