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

// NEW: Booking flow that integrates FindDoctorSearch + DoctorCard
import BookingConsultation from './components/BookingConsultation';

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

          {/* Booking flow: standalone page using DoctorCard + FindDoctorSearch */}
          {/* Make it protected if you only want logged-in users to book:
              <Route path="/book" element={<PrivateRoute><BookingConsultation /></PrivateRoute>} />
          */}
          <Route path="/book" element={<BookingConsultation />} />

          {/* Legacy direct booking form (if still used elsewhere) */}
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

          {/* Fallback: add a 404 if you have one */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </AuthProvider>
  );
}
