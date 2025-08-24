// src/components/BookingConsultation.js
import { useMemo, useState } from "react";
import DoctorCard from "./DoctorCard/DoctorCard";
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import "./InstantConsultation/InstantConsultation.css";

export default function BookingConsultation() {
  const allDoctors = useMemo(
    () => [
      { id: "d1", name: "Dr. Denis Raj", specialty: "Dentist", experienceYears: 24, rating: 4.0, avatarUrl: "/images/doctors/denis.png" },
      { id: "d2", name: "Dr. Aisha Kumar", specialty: "Cardiologist", experienceYears: 14, rating: 4.7, avatarUrl: "/images/doctors/aisha.png" },
      { id: "d3", name: "Dr. Lucas Silva", specialty: "Dermatologist", experienceYears: 9, rating: 4.5, avatarUrl: "/images/doctors/lucas.png" },
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  const filteredDoctors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allDoctors.filter((d) => {
      const matchesQuery =
        !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
      const matchesSpec =
        specialtyFilter === "all" ||
        d.specialty.toLowerCase() === specialtyFilter.toLowerCase();
      return matchesQuery && matchesSpec;
    });
  }, [allDoctors, query, specialtyFilter]);

  return (
    <div className="instant-consultation-container">
      <aside className="instant-consultation-left">
        <FindDoctorSearch
          value={query}
          onChange={setQuery}
          placeholder="Search by doctor or specialty"
        />
        <div className="instant-consultation-filter">
          <label className="ic-filter-label">Specialty</label>
          <select
            className="ic-filter-select"
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Dentist">Dentist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
          </select>
        </div>
      </aside>

      <main className="instant-consultation-right">
        <h2 className="ic-title">Book a Consultation</h2>
        <p className="ic-subtitle">Find a doctor, pick a date & time, and book.</p>

        <div className="ic-results-grid">
          {filteredDoctors.length === 0 ? (
            <div className="ic-empty">No doctors matched your search.</div>
          ) : (
            filteredDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
