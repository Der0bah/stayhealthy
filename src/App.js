// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthProvider from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/RouteGuards/PrivateRoute';

// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Appointment from './pages/Appointment/Appointment';
import Profile from './pages/Profile/Profile';

// Features
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import FindDoctorSearch from './components/FindDoctorSearch/FindDoctorSearch';
import DoctorCardsGrid from './components/DoctorCard/DoctorCard';
import AppointmentForm from './components/AppointmentForm/AppointmentForm';

export default function App() {
  return (
    <AuthProvider>
      {/* Router should be in index.js; keep only Routes here */}
      <Navbar />
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

          {/* Booking flow: form opened from DoctorCard’s button */}
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

          {/* Fallback: could add a 404 page here if you have one */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </AuthProvider>
  );
}
