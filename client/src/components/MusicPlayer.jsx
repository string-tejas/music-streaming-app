import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMusicalNote } from "react-icons/io5";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { motion } from "framer-motion";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FiMinimize2 } from "react-icons/fi";
import { getAllSongs, updateSongCount } from "../api";
import { RiPlayListFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useAuth } from "../context/AuthContext";

const MusicPlayer = () => {
    const [isPlayList, setIsPlayList] = useState(false);
    const [{ allSongs, songIndex, isSongPlaying, miniPlayer }, dispatch] = useStateValue();
    const { firebaseAuth } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);

    const closeMusicPlayer = () => {
        if (isSongPlaying) {
            dispatch({
                type: actionType.SET_IS_SONG_PLAYING,
                isSongPlaying: false,
            });
        }
    };

    const togglePlayer = () => {
        if (miniPlayer) {
            dispatch({
                type: actionType.SET_MINI_PLAYER,
                miniPlayer: false,
            });
        } else {
            dispatch({
                type: actionType.SET_MINI_PLAYER,
                miniPlayer: true,
            });
        }
    };

    const nextTrack = () => {
        if (songIndex === allSongs.length - 1) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: 0,
            });
        } else {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: songIndex + 1,
            });
        }
    };

    const previousTrack = () => {
        if (songIndex === 0) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: 0,
            });
        } else {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: songIndex - 1,
            });
        }
    };

    useEffect(() => {
        if (songIndex > allSongs.length) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: 0,
            });
        }
        setIsFavorite(checkIfFavorite(allSongs[songIndex]));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songIndex]);

    const updateCount = (song) => {
        var flag = false;
        var history = JSON.parse(localStorage.getItem("history") || "[]");
        console.log(" history 1 : ", history);
        if (history.length > 0) {
            history.map((item, index) => {
                if (item._id === song._id) {
                    flag = true;
                }
            });
            if (!flag) {
                history.push(song);
                localStorage.setItem("history", JSON.stringify(history));
                history = JSON.parse(localStorage.getItem("history"));
                console.log(" history 2 : ", history);
            }
        } else {
            if (!flag) {
                history.push(song);
                localStorage.setItem("history", JSON.stringify(history));
                history = JSON.parse(localStorage.getItem("history"));
                console.log(" history 2 : ", history);
                if (history.length > 10) {
                    history.shift();
                }
            }
        }

        updateSongCount(song._id)
            .then((data) => {})
            .catch((err) => console.log(" error in count : ", err));
    };

    const toggleFavorite = (song) => {
        const userId = firebaseAuth.currentUser.uid;
        const currentFavorites = JSON.parse(localStorage.getItem("favorites") || "{}");

        if (userId in currentFavorites) {
            if (currentFavorites[userId].find((s) => s._id === song._id)) {
                currentFavorites[userId] = currentFavorites[userId].filter((item) => item._id !== song._id);
                setIsFavorite(false);
                localStorage.setItem("favorites", JSON.stringify(currentFavorites));
            } else {
                currentFavorites[userId].push(song);
                setIsFavorite(true);
                localStorage.setItem("favorites", JSON.stringify(currentFavorites));
            }
        } else {
            currentFavorites[userId] = [];
            currentFavorites[userId].push(song);
            localStorage.setItem("favorites", JSON.stringify(currentFavorites));
            setIsFavorite(true);
        }
    };
    function checkIfFavorite(song) {
        const userId = firebaseAuth.currentUser.uid;
        const currentFavorites = JSON.parse(localStorage.getItem("favorites") || "{}");
        console.log(currentFavorites);
        if (userId in currentFavorites) {
            if (currentFavorites[userId].find((a) => a._id === song._id)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return (
        <div className="w-full">
            <div className=" md:hidden w-[90%] shadow-md border border-gray-400 flex items-center bg-white m-auto mt-2 rounded-lg px-4 py-2">
                <img src={allSongs[songIndex]?.imageURL} alt="song pic" className="w-12 h-12 rounded-full" />
                <div className="flex flex-col ml-3 flex-1">
                    <h3 className="font-semibold text-lg">
                        {allSongs[songIndex]?.name?.length > 20
                            ? allSongs[songIndex]?.name.slice(0, 20)
                            : allSongs[songIndex]?.name}
                    </h3>
                    <p className="text-sm">{allSongs[songIndex]?.artist}</p>
                </div>
                <div>
                    <button
                        onClick={() => toggleFavorite(allSongs[songIndex])}
                        className="bg-blue-500 active:scale-95 transition-all text-white flex items-center justify-center p-1 rounded-full h-9 w-9 ml-auto"
                    >
                        {isFavorite ? <MdFavorite fontSize={18} /> : <MdOutlineFavoriteBorder fontSize={18} />}
                    </button>
                </div>
            </div>
            <div className="w-full flex items-center gap-3 overflow-hidden">
                <div
                    className={`w-full full items-center gap-3 p-2 pt-0 md:p-4 ${
                        miniPlayer ? "absolute top-40" : "flex relative"
                    }`}
                >
                    <img
                        src={allSongs[songIndex]?.imageURL}
                        className="hidden md:block w-40 h-20 object-cover rounded-md"
                        alt=""
                    />
                    <div className="hidden md:flex items-start flex-col">
                        <p className="text-[14px] md:text-xl text-headingColor font-semibold">
                            {`${
                                allSongs[songIndex]?.name?.length > 20
                                    ? allSongs[songIndex]?.name.slice(0, 20)
                                    : allSongs[songIndex]?.name
                            }`}{" "}
                            <span className="text-[12px] md:text-base">({allSongs[songIndex]?.album})</span>
                        </p>
                        <p className="text-textColor " style={{ lineHeight: 0.9 }}>
                            {allSongs[songIndex]?.artist}{" "}
                            <span
                                className="text-[11px] md:text-sm text-textColor font-semibold"
                                style={{ lineHeight: 0.9 }}
                            >
                                ({allSongs[songIndex]?.category})
                            </span>
                        </p>
                        <div className="flex gap-2">
                            <motion.span
                                className="flex mt-2 gap-2 items-center bg-white rounded-md px-2 py-[1px] cursor-pointer"
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsPlayList(!isPlayList)}
                            >
                                <span className="text-sm md:text-xl">Playlist</span>
                                <RiPlayListFill className="text-textColor hover:text-headingColor mt-1 text-lg md:text-2xl cursor-pointer" />
                            </motion.span>

                            <motion.span
                                className="flex mt-2 gap-2 items-center bg-blue-600 text-white rounded-full p-2 cursor-pointer"
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleFavorite(allSongs[songIndex])}
                            >
                                {isFavorite ? <MdFavorite fontSize={18} /> : <MdOutlineFavoriteBorder fontSize={18} />}
                            </motion.span>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <AudioPlayer
                            src={allSongs[songIndex]?.songURL}
                            onPlay={() => updateCount(allSongs[songIndex])}
                            autoPlay={true}
                            showSkipControls={true}
                            onEnded={() => nextTrack()}
                            onClickNext={nextTrack}
                            onClickPrevious={previousTrack}
                            className="p-0"
                        />
                    </div>
                    <div className="h-full flex items-center justify-center flex-col gap-3">
                        <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
                            <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
                        </motion.i>
                        <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
                            <FiMinimize2 className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
                        </motion.i>
                    </div>
                </div>

                {isPlayList && (
                    <>
                        <PlayListCard />
                    </>
                )}

                {miniPlayer && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="fixed right-2 bottom-2"
                    >
                        <div className="w-36 h-36 mr-4 mb-2 rounded-full flex items-center justify-center relative">
                            <div className="absolute inset-0 rounded-full bg-blue-300 blur-xl animate-pulse"></div>
                            <img
                                onClick={togglePlayer}
                                src={allSongs[songIndex]?.imageURL}
                                className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
                                alt=""
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export const PlayListCard = () => {
    const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song,
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setCurrentPlaySong = (songindex) => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_IS_SONG_PLAYING,
                isSongPlaying: true,
            });
        }
        if (songIndex !== songindex) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: songindex,
            });
        }
    };

    return (
        <div className="absolute bg-white left-1 md:left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md ">
            {allSongs.length > 0 ? (
                allSongs.map((music, index) => (
                    <motion.div
                        initial={{ opacity: 0, translateX: -50 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`group w-full px-3 md:px-4 active:bg-[#999] hover:bg-[#999] flex gap-3 items-center cursor-pointer ${
                            music?._id === songIndex._id ? "bg-card" : "bg-transparent"
                        }`}
                        onClick={() => setCurrentPlaySong(index)}
                    >
                        <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

                        <div className="flex items-start flex-col ">
                            <p className="text-lg text-headingColor font-semibold">
                                {`${music?.name.length > 20 ? music?.name.slice(0, 20) : music?.name}`}{" "}
                                <span className="text-base">({music?.album})</span>
                            </p>
                            <p className="text-textColor">
                                {music?.artist}{" "}
                                <span className="text-sm text-textColor font-semibold">({music?.category})</span>
                            </p>
                        </div>
                    </motion.div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default MusicPlayer;
