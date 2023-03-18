import React from "react";
import { FcGoogle } from "react-icons/fc";
import OAuthButton from "../components/OAuthButton";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const { setAuth, firebaseAuth } = useAuth();

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
      <OAuthButton onClick={loginWithGoogle} icon={<FcGoogle />}>
        Sign in with Google
      </OAuthButton>
    </div>
  );
};

export default Login;
