import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import OAuthButton from "../components/OAuthButton";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const { setAuth, firebaseAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginWithEmailPassword = async () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCred) => {
        console.log("Login", userCred);
        setAuth(true);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        setMessage(error.message);
        setAuth(false);
      });
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCredentials) => {
      if (userCredentials) {
        window.localStorage.setItem("auth", "true");
        setAuth(true);
      }
    });
  };

  return (
    <div>
      Login
      <input
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <OAuthButton onClick={loginWithEmailPassword}>Submit</OAuthButton>
      <OAuthButton onClick={loginWithGoogle} icon={<FcGoogle />}>
        Sign in with Google
      </OAuthButton>
      {message}
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
