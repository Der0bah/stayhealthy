import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./ProfileCard.css";

export default function ProfileCard() {
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", email: "" });
  const [updatedDetails, setUpdatedDetails] = useState({ name: "", phone: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) navigate("/login"); else fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      if (!authtoken || !email) { navigate("/login"); return; }

      const res = await fetch(`${API_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${authtoken}`, Email: email },
      });
      if (!res.ok) throw new Error("Failed to fetch user profile");
      const user = await res.json();
      const safeUser = { name: user?.name || "", phone: user?.phone || "", email: user?.email || email };
      setUserDetails(safeUser); setUpdatedDetails(safeUser);
      if (safeUser.name) sessionStorage.setItem("name", safeUser.name);
      if (safeUser.phone) sessionStorage.setItem("phone", safeUser.phone);
    } catch (err) {
      console.error(err); alert("Could not load your profile. Please try again.");
    } finally { setLoading(false); }
  };

  const handleEdit = () => setEditMode(true);
  const handleInputChange = (e) => setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
      if (!authtoken || !email) { navigate("/login"); return; }

      const payload = { ...updatedDetails, email };
      const res = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${authtoken}`, "Content-Type": "application/json", Email: email },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update profile");

      sessionStorage.setItem("name", payload.name || "");
      sessionStorage.setItem("phone", payload.phone || "");
      setUserDetails(payload); setEditMode(false);
      alert("Profile Updated Successfully!"); navigate("/");
    } catch (err) {
      console.error(err); alert("Could not update your profile. Please try again.");
    }
  };

  if (loading) return (<div className="pc-card"><div className="pc-title">Your Profile</div><div className="pc-loading">Loading…</div></div>);

  return (
    <div className="pc-card">
      <div className="pc-title">Your Profile</div>

      <div className="pc-header">
        <div className="pc-avatar">{userDetails?.name ? userDetails.name.charAt(0).toUpperCase() : "👤"}</div>
        <div className="pc-header-text">
          <h2 className="pc-header-name">{userDetails.name || "User"}</h2>
          <p className="pc-header-sub">{userDetails.email || "No email"} · Joined 2024</p>
        </div>
      </div>

      {editMode ? (
        <form className="pc-form" onSubmit={handleSubmit}>
          <label className="pc-label" htmlFor="pc-name">Name:</label>
          <input id="pc-name" type="text" name="name" className="pc-input" value={updatedDetails.name} onChange={handleInputChange} placeholder="Your name" />

          <label className="pc-label" htmlFor="pc-phone">Phone:</label>
          <input id="pc-phone" type="text" name="phone" className="pc-input" value={updatedDetails.phone} onChange={handleInputChange} placeholder="(xx) xxxxx-xxxx" />

          <label className="pc-label" htmlFor="pc-email">Email:</label>
          <input id="pc-email" type="email" name="email" className="pc-input" value={updatedDetails.email} disabled />

          <div className="pc-actions">
            <button type="button" className="pc-btn" onClick={() => setEditMode(false)}>Cancel</button>
            <button type="submit" className="pc-btn pc-btn-primary">Save</button>
          </div>
        </form>
      ) : (
        <div className="pc-details">
          <p><b>Name:</b> {userDetails.name || "—"}</p>
          <p><b>Email:</b> {userDetails.email || "—"}</p>
          <p><b>Phone:</b> {userDetails.phone || "—"}</p>
          <div className="pc-actions">
            <button className="pc-btn pc-btn-primary" onClick={handleEdit}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}
