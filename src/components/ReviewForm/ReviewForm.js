// src/components/ReviewForm/ReviewForm.js
import React, { useEffect, useMemo, useState } from "react";
import "./ReviewForm.css";

export default function ReviewForm({ rows }) {
  const storageKey = "stayhealthy_reviews_v2";

  const defaultRows = useMemo(
    () => [
      { id: "1", doctorName: "Dr. John Doe", specialty: "Cardiology" },
      { id: "2", doctorName: "Dr. Jane Smith", specialty: "Dermatology" },
    ],
    []
  );

  const [data] = useState(rows && rows.length ? rows : defaultRows);

  const [reviews, setReviews] = useState({});
  const [openId, setOpenId] = useState(null);
  const [formName, setFormName] = useState("");
  const [formComments, setFormComments] = useState("");
  const [formRating, setFormRating] = useState(0);

  // Load saved reviews
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setReviews(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist reviews
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  const openForm = (id) => {
    setOpenId(id);
    const existing = reviews[id];
    setFormName(existing?.reviewerName || "");
    setFormComments(existing?.comments || "");
    setFormRating(existing?.rating || 0);
  };

  const closeForm = () => {
    setOpenId(null);
    setFormName("");
    setFormComments("");
    setFormRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) return alert("Please enter your name.");
    if (!formComments.trim()) return alert("Please write a short review.");
    if (!formRating) return alert("Please select a rating (1–5).");

    setReviews({
      ...reviews,
      [openId]: {
        reviewerName: formName.trim(),
        comments: formComments.trim(),
        rating: Number(formRating),
        createdAt: Date.now(),
      },
    });

    closeForm();
  };

  // ✅ The return must be inside the component
  return (
    <section className="rf-wrap">
      <h2 className="rf-title">Reviews</h2>

      <div className="rf-card">
        <div className="rf-table-scroll">
          <table className="rf-table">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>Provide feedback</th>
                <th>Review Given</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => {
                const r = reviews[row.id];
                const disabled = Boolean(r);
                return (
                  <tr key={row.id}>
                    <td>{idx + 1}</td>
                    <td className="rf-doctor">{row.doctorName}</td>
                    <td>{row.specialty}</td>
                    <td>
                      <button
                        className={`rf-btn rf-btn-primary ${disabled ? "rf-btn-disabled" : ""}`}
                        onClick={() => openForm(row.id)}
                        disabled={disabled}
                      >
                        {disabled ? "Submitted" : "Click Here"}
                      </button>
                    </td>
                    <td className="rf-review-cell">
                      {r ? (
                        <div className="rf-review-chip">
                          <div className="rf-review-head">
                            <span className="rf-review-name">{r.reviewerName}</span>
                            <span className="rf-review-stars">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`rf-star ${i < r.rating ? "full" : ""}`}>★</span>
                              ))}
                            </span>
                          </div>
                          <div className="rf-review-text">{r.comments}</div>
                        </div>
                      ) : (
                        <span className="rf-muted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {openId && (
        <div className="rf-modal" role="dialog" aria-modal="true">
          <div className="rf-modal-card">
            <div className="rf-modal-header">
              <h3>Give Your Review</h3>
              <button className="rf-close" onClick={closeForm} aria-label="Close">×</button>
            </div>

            <form className="rf-form" onSubmit={handleSubmit}>
              <div className="rf-row">
                <label className="rf-label" htmlFor="rf-name">Name:</label>
                <input
                  id="rf-name"
                  className="rf-input"
                  placeholder="Your name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div className="rf-row">
                <label className="rf-label" htmlFor="rf-review">Review:</label>
                <textarea
                  id="rf-review"
                  className="rf-textarea"
                  rows={4}
                  placeholder="Write your experience…"
                  value={formComments}
                  onChange={(e) => setFormComments(e.target.value)}
                />
              </div>

              <div className="rf-row">
                <label className="rf-label">Rating:</label>
                <div className="rf-stars-picker">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`rf-star-btn ${n <= formRating ? "on" : ""}`}
                      onClick={() => setFormRating(n)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="rf-actions">
                <button type="button" className="rf-btn" onClick={closeForm}>Cancel</button>
                <button type="submit" className="rf-btn rf-btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
