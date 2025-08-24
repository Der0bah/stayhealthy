import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/RouteGuards/PrivateRoute";

// Pages
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Appointment from "./pages/Appointment/Appointment";
import Profile from "./pages/Profile/Profile";

// Features
import InstantConsultation from "./components/InstantConsultation/InstantConsultation";
import FindDoctorSearch from "./components/FindDoctorSearch/FindDoctorSearch";
import DoctorCardsGrid from "./components/DoctorCard/DoctorCard";
import AppointmentForm from "./components/AppointmentForm/AppointmentForm";

// 🔔 Global Notification
import Notification from "./components/Notification/Notification";
import NotificationProvider from "./context/NotificationContext";

// ⭐ Reviews
import ReviewForm from "./components/ReviewForm/ReviewForm";

export default function App() {
  // ----- global notification state -----
  const [notifyShow, setNotifyShow] = useState(false);
  const [notifyCanceled, setNotifyCanceled] = useState(false);
  const [lastBooked, setLastBooked] = useState(null);

  const showNotification = (appointment) => {
    setLastBooked(appointment || {});
    setNotifyCanceled(false);
    setNotifyShow(true);
  };
  const hideNotification = () => {
    setNotifyCanceled(true);
    setNotifyShow(false);
  };

  // ----- Build rows for ReviewForm from saved appointments -----
  // Reads localStorage keys that start with "appointments_"
  const reviewRows = useMemo(() => {
    const rows = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith("appointments_")) continue;

        const list = JSON.parse(localStorage.getItem(key) || "[]");
        if (!Array.isArray(list) || list.length === 0) continue;

        const latest = list[0];
        rows.push({
          id: String(latest.doctorId || key.replace("appointments_", "")),
          doctorName: latest.doctorName || "Doctor",
          specialty: latest.specialty || "—", // will be "—" if not stored
        });
      }
      rows.sort((a, b) => a.doctorName.localeCompare(b.doctorName));
    } catch {
      /* ignore parse errors */
    }
    return rows;
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider value={{ show: showNotification, hide: hideNotification }}>
        <Navbar />

        {/* Global toast-like notification visible on every page */}
        <Notification
          appointment={lastBooked || {}}
          show={notifyShow}
          canceled={notifyCanceled}
          onDismiss={() => setNotifyShow(false)}
          autoHideMs={6000}
        />

        <main className="container py-6">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected pages */}
            <Route
              path="/appointments"
              element={
                <PrivateRoute>
                  <Appointment />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* Booking flow */}
            <Route
              path="/appointments/new"
              element={
                <PrivateRoute>
                  <AppointmentForm />
                </PrivateRoute>
              }
            />

            {/* Public feature routes */}
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/find-doctor" element={<FindDoctorSearch />} />
            <Route path="/doctors" element={<DoctorCardsGrid />} />

            {/* ⭐ Reviews page */}
            <Route path="/reviews" element={<ReviewForm rows={reviewRows} />} />
          </Routes>
        </main>
      </NotificationProvider>
    </AuthProvider>
  );
}
