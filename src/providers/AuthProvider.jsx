import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
const auth = "";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Register with email and password
  const register = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  // Check if the token is present in the cookies

  // Login with email and Password
  const signIn = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };
  // Register with Google
  const googleRegister = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // Register with Github
  const githubRegister = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  // Update user Info
  const updateUser = (user, payLoad) => {
    return updateProfile(user, payLoad);
  };

  // Log out User
  const logOut = () => {
    return signOut(auth);
  };

  const authItems = {
    user,
    register,
    updateProfile,
    loading,
    setLoading,
    signIn,
    logOut,
    setUser,
    updateUser,
    googleRegister,
    githubRegister,
  };
  return (
    <AuthContext.Provider value={authItems}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
