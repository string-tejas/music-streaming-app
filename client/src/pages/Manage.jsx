import React from "react";
import { Heading } from "./Landing";
import { NavLink, Route, Routes } from "react-router-dom";
import { ImStatsDots } from "react-icons/im";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { TbPlaylistAdd } from "react-icons/tb";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { BsDisc } from "react-icons/bs";
import ManageSongs from "./ManageSongs";
import ManageAddSongs from "./ManageAddSongs";
import ManageAlbums from "./ManageAlbums";
import ManageViewAlbums from "./ManageViewAlbums";

const Manage = () => {
    const navLinkStyle = ({ isActive }) =>
        `px-4 flex gap-4 items-center py-2 rounded-lg w-full hover:bg-gray-200 bg-white ${
            isActive ? "bg-gray-300" : ""
        }}`;
    return (
        <>
            <Heading />

            <div className="flex flex-col md:flex-row w-full h-auto md:h-[calc(100vh-72px)] ">
                <div className="w-[270px] flex gap-3 flex-col px-4 py-8">
                    <NavLink className={navLinkStyle} to={"/manage"}>
                        <ImStatsDots />
                        Overview
                    </NavLink>
                    <NavLink className={navLinkStyle} to={"/manage/songs"}>
                        <BsMusicNoteBeamed />
                        Songs
                    </NavLink>
                    <NavLink className={navLinkStyle} to={"/manage/albums"}>
                        <BsDisc />
                        Albums
                    </NavLink>
                    <NavLink className={navLinkStyle} to={"/manage/addSong"}>
                        <TbPlaylistAdd />
                        Add Song
                    </NavLink>
                    <NavLink className={navLinkStyle} to={"/manage/addAlbum"}>
                        <MdOutlineAddToPhotos />
                        Add Album
                    </NavLink>
                </div>
                <div className="flex-1 bg-blue-200">
                    <Routes>
                        <Route path="/" element={<div>stats</div>} />
                        <Route path="/songs" element={<ManageSongs />} />
                        <Route path="/addSong" element={<ManageAddSongs />} />
                        <Route path="/addAlbum" element={<ManageAlbums />} />
                        <Route path="/albums" element={<ManageViewAlbums />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default Manage;
