import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthProvider from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/RouteGuards/PrivateRoute';

// pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Appointment from './pages/Appointment/Appointment';
import Profile from './pages/Profile/Profile';

// features
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import FindDoctorSearch from './components/FindDoctorSearch/FindDoctorSearch';

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="container py-6">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/find-doctor" element={<FindDoctorSearch />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}
