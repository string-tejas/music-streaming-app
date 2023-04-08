import React from "react";
import DashboardAddAlbum from "./Dashboard/DashboardAddAlbum";

const ManageAlbums = () => {
    return (
        <>
            <div className="mx-4 my-4 p-4 rounded-xl shadow-sm bg-white">
                <span className="text-2xl ml-8 font-semibold">Add New Album</span>
            </div>
            <div className="mx-4 my-4 p-4 rounded-xl shadow-sm bg-white">
                <DashboardAddAlbum onlyForm />
            </div>
        </>
    );
};

export default ManageAlbums;
