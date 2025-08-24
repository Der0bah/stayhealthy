import React, { useMemo, useState } from "react";
import "./ReportsLayout.css";

export default function ReportsLayout({ rows }) {
  const defaultRows = useMemo(() => {
    const out = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith("appointments_")) continue;
        const list = JSON.parse(localStorage.getItem(key) || "[]");
        if (!Array.isArray(list)) continue;
        list.forEach((appt, idx) => {
          out.push({
            id: `${key}_${idx}`,
            doctorName: appt.doctorName || "Doctor",
            specialty: appt.specialty || "—",
            date: appt.date || "—",
            time: appt.timeSlot || "—",
          });
        });
      }
    } catch {}
    if (out.length === 0) {
      return [
        { id: "1", doctorName: "Dr. John Doe", specialty: "Cardiology", date: "2025-06-12", time: "10:30 AM" },
        { id: "2", doctorName: "Dr. Jane Smith", specialty: "Dermatology", date: "2025-06-15", time: "02:00 PM" },
      ];
    }
    return out;
  }, []);

  const [data] = useState(rows && rows.length ? rows : defaultRows);

  return (
    <section className="rep-wrap">
      <h2 className="rep-title">Reports</h2>

      <div className="rep-card">
        <div className="rep-table-scroll">
          <table className="rep-table">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>View Report</th>
                <th>Download Report</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={row.id}>
                  <td>{idx + 1}</td>
                  <td className="rep-doctor">{row.doctorName}</td>
                  <td>{row.specialty}</td>
                  <td>
                    <a href="/reports/patient_report.pdf" target="_blank" rel="noopener noreferrer" className="rep-btn rep-btn-primary">
                      View Report
                    </a>
                  </td>
                  <td>
                    <a href="/reports/patient_report.pdf" download={`report_${row.id}.pdf`} className="rep-btn rep-btn-primary">
                      Download Report
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
