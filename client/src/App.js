import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Home, Login } from "./pages";

function App() {
  return (
    <AuthProvider>
      <div className="w-screen h-screen flex justify-center items-center text-base">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
