import React from "react";
import { FcGoogle } from "react-icons/fc";
import OAuthButton from "../components/OAuthButton";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCredentials) => {
      console.log(userCredentials);
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
