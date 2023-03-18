import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import OAuthButton from "../components/OAuthButton";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userCredentials) => {
    if (userCredentials) {
      setAuth(true);
      window.localStorage.setItem("auth", "true");

      firebaseAuth.onAuthStateChanged((uCred) => {
        if (uCred) {
          console.log(uCred);
          navigate("/", { replace: true });
        } else {
          setAuth(false);
          navigate("/login");
        }
      });
    }
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then(handleLogin);
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

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
