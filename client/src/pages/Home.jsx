import React from "react";
import OAuthButton from "../components/OAuthButton";
import { FcGoogle } from "react-icons/fc";

const Home = () => {
  return (
    <div>
      Home
      <OAuthButton icon={<FcGoogle />}>Sign in with Google</OAuthButton>
    </div>
  );
};

export default Home;
