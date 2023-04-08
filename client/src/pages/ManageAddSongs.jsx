import React from "react";
import DashboardNewSong from "./Dashboard/DashboardNewSong";

const ManageAddSongs = () => {
    return (
        <>
            <div className="mx-4 my-4 p-4 rounded-xl shadow-sm bg-white">
                <span className="text-2xl ml-8 font-semibold">Add New Song</span>
            </div>
            <div className="mx-4 my-4 p-4 rounded-xl shadow-sm bg-white">
                <DashboardNewSong byArtist onlySongs />
            </div>
        </>
    );
};

export default ManageAddSongs;
