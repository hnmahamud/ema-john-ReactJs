import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fullLoading, setFullLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const profileUpdate = (updateName, updatePhoto) => {
    return updateProfile(auth.currentUser, {
      displayName: updateName,
      photoURL: updatePhoto,
    });
  };

  const verificationEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const logout = () => {
    return signOut(auth);
  };

  const authInfo = {
    loading,
    setLoading,
    setFullLoading,
    fullLoading,
    user,
    createUser,
    profileUpdate,
    verificationEmail,
    logout,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setFullLoading(false);
      setLoading(false);

      return () => {
        return unsubscribe();
      };
    });
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
