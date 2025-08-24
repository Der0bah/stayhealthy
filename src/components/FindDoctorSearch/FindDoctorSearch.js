import React, { useEffect, useMemo, useRef, useState } from "react";
import "./FindDoctorSearch.css";

const DEFAULT_SPECIALTIES = [
  "Dentist",
  "Gynecologist/Obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-Nose-Throat (ENT) Specialist",
  "Homeopath",
  "Cardiologist",
  "Neurologist",
  "Orthopedist",
  "Pediatrician",
  "Psychiatrist",
  "Ophthalmologist",
];

export default function FindDoctorSearch({
  specialties = DEFAULT_SPECIALTIES,
  onSelect,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [filters, setFilters] = useState({
    inNetwork: false,
    telehealth: false,
    nearMe: false,
  });

  const boxRef = useRef(null);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return specialties;
    const q = query.toLowerCase();
    return specialties.filter((s) => s.toLowerCase().includes(q));
  }, [query, specialties]);

  useEffect(() => {
    function onDocClick(e) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function handleFocus() {
    setOpen(true);
  }

  function handlePick(value) {
    setQuery(value);
    setOpen(false);
    setActive(-1);
    onSelect?.(value, filters);
  }

  function onKeyDown(e) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      setActive(0);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) handlePick(filtered[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className="fds-root" ref={boxRef}>
      <div className="fds-searchbar">
        <input
          ref={inputRef}
          className="fds-input"
          type="text"
          value={query}
          placeholder="Search doctors, clinics, hospitals, etc."
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={onKeyDown}
          aria-expanded={open}
          aria-controls="fds-listbox"
          aria-autocomplete="list"
          role="combobox"
        />
        <button
          type="button"
          className="fds-iconbtn"
          aria-label="Search"
          onClick={() => onSelect?.(query.trim(), filters)}
        >
          🔍
        </button>
      </div>

      <div className="fds-filters" aria-label="Search filters">
        <label className="fds-chip">
          <input
            type="checkbox"
            checked={filters.inNetwork}
            onChange={(e) =>
              setFilters((f) => ({ ...f, inNetwork: e.target.checked }))
            }
          />
          <span>In‑Network</span>
        </label>
        <label className="fds-chip">
          <input
            type="checkbox"
            checked={filters.telehealth}
            onChange={(e) =>
              setFilters((f) => ({ ...f, telehealth: e.target.checked }))
            }
          />
          <span>Telehealth</span>
        </label>
        <label className="fds-chip">
          <input
            type="checkbox"
            checked={filters.nearMe}
            onChange={(e) =>
              setFilters((f) => ({ ...f, nearMe: e.target.checked }))
            }
          />
          <span>Near Me</span>
        </label>
      </div>

      {open && (
        <ul
          id="fds-listbox"
          role="listbox"
          className="fds-list"
          aria-label="Doctor specialties"
        >
          {filtered.length === 0 && (
            <li className="fds-empty">No specialties found</li>
          )}

          {filtered.map((item, idx) => (
            <li
              key={item}
              role="option"
              aria-selected={active === idx}
              tabIndex={-1}
              className={`fds-row ${active === idx ? "is-active" : ""}`}
              onMouseEnter={() => setActive(idx)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handlePick(item)}
            >
              <span className="fds-lens">🔍</span>
              <span className="fds-text">{item}</span>
              <span className="fds-tag">SPECIALITY</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
