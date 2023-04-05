import React from "react";
import { Route, Routes } from "react-router-dom";
import NeedAuth from "./components/Routes/NeedAuth";
import NoAuth from "./components/Routes/NoAuth";
import { useAuth } from "./context/AuthContext";
import { About, Home, Login, Register, Landing } from "./pages";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import { useStateValue } from "./context/StateProvider";
import { motion } from "framer-motion";
import MusicPlayer from "./components/MusicPlayer";
import Trending from "./pages/Trending";
import { AddNewArtist } from "./pages/Dashboard/DashboardNewSong";
import DashboardAddArtist from "./pages/Dashboard/DashboardAddArtist";
import DashboardAddAlbum from "./pages/Dashboard/DashboardAddAlbum";
import Explore from "./pages/Explore";
import RequestArtist from "./pages/Dashboard/RequestArtist";
import DashboardArtistRequest from "./pages/Dashboard/DashboardArtistRequest";

function App() {
    const [{ isSongPlaying }] = useStateValue();
    const { auth } = useAuth();

    return (
        <AnimatePresence mode="wait">
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
                <Route path="/trending" element={<Trending />} />

                <Route
                    path="/dashboard/*"
                    element={
                        <NeedAuth>
                            <Dashboard />
                        </NeedAuth>
                    }
                />

<Route
                    path="/dashboard/artistRequest"
                    element={
                        <NeedAuth>
                            <DashboardArtistRequest />
                        </NeedAuth>
                    }
                />

            <Route
                    path="/requestArtist"
                    element={
                        <NeedAuth>
                            <RequestArtist/>
                        </NeedAuth>
                    }
                />

                <Route path="/explore/" element={<Explore />} />

                <Route
                    path="/dashboard/addArtist"
                    element={
                        <NeedAuth>
                            <DashboardAddArtist />
                        </NeedAuth>
                    }
                />

<Route
                    path="/dashboard/addAlbum"
                    element={
                        <NeedAuth>
                            <DashboardAddAlbum />
                        </NeedAuth>
                    }
                />

                <Route
                    path="/*"
                    element={
                        auth ? (
                            <NeedAuth>
                                <Home />
                            </NeedAuth>
                        ) : (
                            <Landing />
                        )
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
        </AnimatePresence>
    );
}

export default App;
