import React, { useEffect, useState } from "react";
import { getSongsByArtistName } from "../api";
import { useAuth } from "../context/AuthContext";
import { SongContainer } from "./Dashboard/DashboardSongs";

const ManageSongs = () => {
    const [loading, setLoading] = useState(true);
    const [songsByThisArtist, setSongsByThisArtist] = useState([]);
    const { firebaseAuth } = useAuth();

    useEffect(() => {
        const user = firebaseAuth.currentUser;
        setLoading(true);

        getSongsByArtistName(user?.name || user?.displayName)
            .then((res) => {
                console.log(res);
                setSongsByThisArtist(res.song);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className="mx-4 my-4 p-4 rounded-xl shadow-sm  bg-white">
                <span className="text-2xl ml-8 font-semibold">Your Songs</span>
            </div>
            <div className="mx-4 my-4 p-4 rounded-xl shadow-sm  bg-white">
                {loading && <div>Loading...</div>}
                {!loading && songsByThisArtist.length === 0 && <div>No songs found</div>}
                {<SongContainer data={songsByThisArtist} />}
            </div>
        </>
    );
};

export default ManageSongs;
