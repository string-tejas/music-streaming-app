import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAlbumsByArtistName } from "../api";
import { AlbumContainer } from "./Dashboard/DashboardAlbums";

const ManageViewAlbums = () => {
    const { firebaseAuth } = useAuth();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getAlbumsByArtistName(firebaseAuth.currentUser?.name || firebaseAuth.currentUser?.displayName).then((data) => {
            setAlbums(data?.albums || []);
        });
    }, []);

    return (
        <>
            <div className="mx-4 my-4 p-4 rounded-xl shadow-sm bg-white">
                <span className="text-2xl ml-8 font-semibold">View Albums</span>
            </div>
            <div className="mx-4 my-4 p-4 rounded-xl shadow-sm bg-white">
                {albums.length === 0 && <div className="text-center text-xl  text-gray-500">No Albums Found</div>}
                <AlbumContainer data={albums} />
            </div>
        </>
    );
};

export default ManageViewAlbums;
