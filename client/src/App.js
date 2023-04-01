import React from "react";
import { Route, Routes } from "react-router-dom";
import NeedAuth from "./components/Routes/NeedAuth";
import NoAuth from "./components/Routes/NoAuth";
import { AuthProvider } from "./context/AuthContext";
import { About, Home, Login, Register } from "./pages";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import { useStateValue } from "./context/StateProvider";
import { motion } from "framer-motion";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [{ isSongPlaying }] = useStateValue();
  return (
    <AnimatePresence mode="wait">
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
            path="/dashboard/*"
            element={
              <NeedAuth>
                <Dashboard />
              </NeedAuth>
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
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </AuthProvider>
    </AnimatePresence>
  );
}

export default App;
