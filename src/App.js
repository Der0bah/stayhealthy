import React, { useState } from "react";
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

// 🔔 Notification (global)
import Notification from "./components/Notification/Notification";
import NotificationProvider from "./context/NotificationContext";

export default function App() {
  // Global notification state
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

  return (
    <AuthProvider>
      {/* Provide global show/hide to all children */}
      <NotificationProvider value={{ show: showNotification, hide: hideNotification }}>
        <Navbar />

        {/* Global Notification: visible on every page */}
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
          </Routes>
        </main>
      </NotificationProvider>
    </AuthProvider>
  );
}
