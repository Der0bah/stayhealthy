import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

const LS_KEY = 'app_auth_user';

export default function AuthProvider({ children }){
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_KEY);
  }, [user]);

  const signup = (profile) => setUser(profile);
  const login = ({ email }) => {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) throw new Error('No account found. Please sign up.');
    const savedUser = JSON.parse(saved);
    if (savedUser.email !== email) throw new Error('Email does not match any account.');
    setUser(savedUser);
  };
  const logout = () => setUser(null);
  const updateProfile = (updates) => setUser((u) => ({ ...u, ...updates }));

  return (
    <AuthCtx.Provider value={{ user, signup, login, logout, updateProfile }}>
      {children}
    </AuthCtx.Provider>
  );
}
