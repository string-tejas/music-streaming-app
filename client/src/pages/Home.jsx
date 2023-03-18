import React from "react";
import OAuthButton from "../components/OAuthButton";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { setAuth, firebaseAuth } = useAuth();

  const handleLogoutClick = async () => {
    await firebaseAuth.signOut().then(() => {
      setAuth(false);
      window.localStorage.setItem("auth", "false");
    });
  };
  return (
    <div>
      Home
      <OAuthButton icon={<FiLogOut />} onClick={handleLogoutClick}>
        Logout
      </OAuthButton>
    </div>
  );
};

export default Home;
