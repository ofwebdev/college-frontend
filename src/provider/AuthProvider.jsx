import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
  signInWithPopup,
  GithubAuthProvider,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../firebase/firebase.config";
// import axios from "axios";
const auth = getAuth(app);

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).catch(
      (error) => console.log(error)
    );
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const sentEmailLink = () => {
    const user = auth.currentUser;
    return sendEmailVerification(user);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGmail = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signInWithGitHub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signInWithTwitter = () => {
    const provider = new TwitterAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const recoverPassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("AUth state change", currentUser);
      setUser(currentUser);
      setLoading(false);

      // // get and set token
      // if (currentUser) {
      //   axios
      //     .post("https://backend-pi-ten.vercel.app/jwt", {
      //       email: currentUser.email,
      //     })
      //     .then((data) => {
      //       // console.log(data.data.token);
      //       localStorage.setItem("access-token", data.data.token);
      //       setLoading(false);
      //     });
      // } else {
      //   localStorage.removeItem("access-token");
      // }
    });

    // cleanup
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    updateUserProfile,
    sentEmailLink,
    signIn,
    signInWithGmail,
    signInWithFacebook,
    signInWithTwitter,
    signInWithGitHub,
    recoverPassword,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
