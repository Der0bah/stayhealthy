import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/RouteGuards/PrivateRoute";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Appointment from "./pages/Appointment/Appointment";
import Profile from "./pages/Profile/Profile";

import InstantConsultation from "./components/InstantConsultation/InstantConsultation";
import FindDoctorSearch from "./components/FindDoctorSearch/FindDoctorSearch";
import DoctorCardsGrid from "./components/DoctorCard/DoctorCard";
import AppointmentForm from "./components/AppointmentForm/AppointmentForm";

import Notification from "./components/Notification/Notification";
import NotificationProvider from "./context/NotificationContext";

import ReviewForm from "./components/ReviewForm/ReviewForm";
import ReportsLayout from "./components/ReportsLayout/ReportsLayout";

export default function App() {
  const [notifyShow, setNotifyShow] = useState(false);
  const [notifyCanceled, setNotifyCanceled] = useState(false);
  const [lastBooked, setLastBooked] = useState(null);

  const showNotification = (appointment) => { setLastBooked(appointment || {}); setNotifyCanceled(false); setNotifyShow(true); };
  const hideNotification = () => { setNotifyCanceled(true); setNotifyShow(false); };

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
          specialty: latest.specialty || "—",
        });
      }
      rows.sort((a, b) => a.doctorName.localeCompare(b.doctorName));
    } catch {}
    return rows;
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider value={{ show: showNotification, hide: hideNotification }}>
        <Navbar />

        <Notification appointment={lastBooked || {}} show={notifyShow} canceled={notifyCanceled} onDismiss={() => setNotifyShow(false)} autoHideMs={6000} />

        <main className="container py-6">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/appointments" element={<PrivateRoute><Appointment /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/appointments/new" element={<PrivateRoute><AppointmentForm /></PrivateRoute>} />

            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/find-doctor" element={<FindDoctorSearch />} />
            <Route path="/doctors" element={<DoctorCardsGrid />} />

            <Route path="/reviews" element={<ReviewForm rows={reviewRows} />} />
            <Route path="/reports" element={<PrivateRoute><ReportsLayout /></PrivateRoute>} />
          </Routes>
        </main>
      </NotificationProvider>
    </AuthProvider>
  );
}
