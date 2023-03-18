import React from "react";
import { Route, Routes } from "react-router-dom";
import NeedAuth from "./components/Routes/NeedAuth";
import NoAuth from "./components/Routes/NoAuth";
import { AuthProvider } from "./context/AuthContext";
import { About, Home, Login, Register } from "./pages";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-base">
      <AuthProvider>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={
              <NoAuth>
                <Login />
              </NoAuth>
            }
          />
          <Route
            path="/register"
            element={
              <NoAuth>
                <Register />
              </NoAuth>
            }
          />
          <Route
            path="/*"
            element={
              <NeedAuth>
                <Home />
              </NeedAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
