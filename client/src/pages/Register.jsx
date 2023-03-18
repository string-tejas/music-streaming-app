import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuthButton from "../components/OAuthButton";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { firebaseAuth, setAuth } = useAuth();

  const registerUser = async () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCred) => {
        console.log("Register", userCred);
        setAuth(true);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        setMessage(error.message);
        setAuth(false);
      });
  };

  return (
    <div>
      Register
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
      <OAuthButton onClick={registerUser}>Submit</OAuthButton>
      {message}
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
