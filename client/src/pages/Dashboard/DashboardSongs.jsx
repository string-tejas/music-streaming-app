import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import { AiOutlineClear } from "react-icons/ai";
// import { deleteSongById, getAllSongs } from "../api";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { getAllSongs } from "../../api";
import SongCard from "../ItemCard";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashboardSongs = () => {
    const [songFilter, setSongFilter] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [{ allSongs }, dispath] = useStateValue();

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                dispath({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song,
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full flex items-center justify-center flex-col">
            <div className="w-full flex justify-center items-center gap-20">
                <NavLink
                    to={"/dashboard/newSong"}
                    className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300
       hover:border-gray-500 hover:shadow-md cursor-pointer"
                >
                    <IoAdd />
                </NavLink>

                <input
                    type="text"
                    placeholder="Search here "
                    value={songFilter}
                    className={`w-52 px-4 py-2 border
         ${isFocus ? "border-gray-500 shadow-md" : "border-gray-300"} 
         rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base
         text-textColor font-semibold`}
                    onChange={(e) => setSongFilter(e.target.value)}
                    onBlur={() => {
                        setIsFocus(false);
                    }}
                    onFocus={() => setIsFocus(true)}
                ></input>
                <i>
                    <AiOutlineClear className="text-3xl text-textColor cursor-pointer " />
                </i>
            </div>

            <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">
                <div className="top-4 left-4">
                    <p className="text-xl font-bold">
                        <span className="text-sm font-semibold text-textColor">Count : {allSongs?.length}</span>
                    </p>
                </div>
                <SongContainer data={allSongs} />
            </div>
        </div>
    );
};

export const SongContainer = ({ data }) => {
    const [{ isSongPlaying, songIndex }, dispatch] = useStateValue();

    const addSongToContext = (song, index) => {
        // console.log("added", song);
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_IS_SONG_PLAYING,
                isSongPlaying: true,
            });
        }

        if (songIndex !== index) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: index,
            });
        }
    };

    return (
        <div className="w-full flex flex-wrap gap-3 items-center justify-even">
            {data &&
                data.map((song, i) => {
                    return (
                        <SongCard key={song._id} data={song} type="song" onClick={() => addSongToContext(song, i)} />
                    );
                })}
        </div>
    );
};

export default DashboardSongs;
