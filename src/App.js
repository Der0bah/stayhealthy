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

// NEW: the integrated booking screen (optional)
import BookingConsultation from './components/BookingConsultation';

// (Optional) If you want a direct form route using the NEW AppointmentForm component
// import AppointmentForm from './components/AppointmentForm/AppointmentForm';

export default function App() {
  return (
    <AuthProvider>
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

          {/* OPTIONAL: expose new booking page */}
          <Route path="/book" element={<BookingConsultation />} />

          {/* If you want a direct route to the new AppointmentForm component, uncomment:
          <Route
            path="/appointments/new"
            element={
              <PrivateRoute>
                <AppointmentForm />
              </PrivateRoute>
            }
          />
          */}

          {/* Existing public feature routes */}
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/find-doctor" element={<FindDoctorSearch />} />
          <Route path="/doctors" element={<DoctorCardsGrid />} />

          {/* You can add a 404 here if desired */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </AuthProvider>
  );
}
