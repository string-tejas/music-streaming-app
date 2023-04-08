import React from "react";
import Dashboard from "./index";
import { AddNewAlbum } from "./DashboardNewSong";

const DashboardAddAlbum = ({ onlyForm = false }) => {
    return (
        <>
            {!onlyForm && <Dashboard />}
            <AddNewAlbum />
        </>
    );
};

export default DashboardAddAlbum;
