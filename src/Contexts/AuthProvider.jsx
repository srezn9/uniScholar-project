import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";



import { AuthContext } from "./AuthContext";
import { auth } from "../firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      
      if (currentUser?.email) {
        try {
          const res = await fetch("https://tutor-sphere-server.vercel.app/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: currentUser.displayName || "No Name",
              email: currentUser.email,
            }),
          });
          await res.json();
          // console.log("User sent to DB:", data);
        } catch (error) {
          console.error(" Failed to send user to DB:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const authInfo = {
    user,
    loading,
    register,
    login,
    logout,
    googleLogin,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;