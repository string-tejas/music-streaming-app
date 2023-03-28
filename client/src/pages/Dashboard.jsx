import React from "react";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="w-[60%] my- bg-blue-500 p-4 flex items-center justify-evenly"></div>
    </div>
  );
};

export default Dashboard;
