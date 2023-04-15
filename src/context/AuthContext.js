import React, { useContext, useEffect, useState } from "react";

import app from "@/utils/firebase";

const AuthContext = React.createContext();

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(data) {
    return createUserWithEmailAndPassword(auth, data.email, data.password);
  }

  function login(data) {
    return signInWithEmailAndPassword(auth, data.email, data.password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  //   function updateEmail(email) {
  //     return currentUser.updateEmail(email);
  //   }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  const updateUser = async (displayName, photoURL) => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateUser,
    // updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
