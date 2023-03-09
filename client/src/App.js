import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";

function App() {
  return (
    <div className="w-screen h-screen bg-blue-400 flex justify-center items-center text-base font-bold">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
