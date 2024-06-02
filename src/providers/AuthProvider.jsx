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
import useAxios from "../hooks/useAxios";
import auth from "../helper/GAuth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const nSAxios = useAxios();
  const [loading, setLoading] = useState(false); //should be true
  const [user, setUser] = useState(null);
  const [regiSuccess, setRegiSuccess] = useState(false);
  const [tokenSaved, setTokenSaved] = useState(false);

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

  //   Observe ther user change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currUser) => {
      if (currUser?.uid) {
        setUser(currUser);

        const { data } = await nSAxios.post("/api/jwt", { uid: currUser.uid });
        if (data) {
          localStorage.setItem("access-token", data);
          setTokenSaved(true);
        }
      } else {
        localStorage.removeItem("access-token");
        setTokenSaved(false);
      }

      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authItems = {
    user,
    setUser,
    register,
    updateProfile,
    loading,
    setLoading,
    signIn,
    logOut,
    updateUser,
    googleRegister,
    githubRegister,
    regiSuccess,
    setRegiSuccess,
    tokenSaved,
    setTokenSaved,
  };
  return (
    <AuthContext.Provider value={authItems}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
