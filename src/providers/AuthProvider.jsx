import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = (props = {}) => {
  const auth = getAuth(app);
  const axiosPublic = useAxiosPublic();
  // console.log(app);

  const { children } = props || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   sign in options

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const signInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  //update and verification options

  const forgotPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserData = (updatedData = {}) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const verifyUserEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  //   logout options

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt/sign", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            axiosPublic(`/users/single/${currentUser.email}`)
              .then((data) => {
                setUser({ ...currentUser, ...data.data });
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          }
        });
      } else {
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    signInWithGoogle,
    logOut,
    updateUserData,
    signInWithGithub,
    forgotPass,
    verifyUserEmail,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
