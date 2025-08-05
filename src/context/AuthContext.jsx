import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const ADMIN_EMAIL = 'elvis@beautyshop.com';
const ADMIN_PASSWORD = 'adminpass'; 
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const loginAsBuyer = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google login error:', error);
      alert('Buyer login failed. Please try again.');
    }
  };
  const loginAsAdmin = async () => {
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    } catch (error) {
      console.error('Admin login error:', error);
      alert('Admin login failed. Check credentials.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User signed out.');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loginAsBuyer,
        loginAsAdmin,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
