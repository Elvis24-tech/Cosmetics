import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAW-1iZ7Z-tQHu32lQE3lvUevEFwGZOnEI",
  authDomain: "cosmetics-ba479.firebaseapp.com",
  projectId: "cosmetics-ba479",
  storageBucket: "cosmetics-ba479.appspot.com",
  messagingSenderId: "967364352275",
  appId: "1:967364352275:web:9dde19ce1e7e0dcc5ae2e6",
  measurementId: "G-7J0XD584PG"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Define your admin email
const ADMIN_EMAIL = 'elvis@beautyshop.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // If user is not logged in but visits /admin, auto-set admin
        if (window.location.pathname === '/admin') {
          setUser({ email: ADMIN_EMAIL }); // Fake user object for admin
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  const isAuthenticated = !!user;
  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
