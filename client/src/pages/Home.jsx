import React from "react";
// import OAuthButton from "../components/OAuthButton";
// import { FiLogOut } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const Home = () => {
  // const { setAuth, firebaseAuth } = useAuth();

  // const handleLogoutClick = async () => {
  //   await firebaseAuth.signOut().then(() => {
  //     setAuth(false);
  //   });
  // };
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
    </div>
  );
};

export default Home;
