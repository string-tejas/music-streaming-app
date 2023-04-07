import React, { useState } from "react";
import { Heading } from "./Landing";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import MySongCard from "../components/MySongCard";
import { useAuth } from "../context/AuthContext";

const Favorites = () => {
    const { firebaseAuth } = useAuth();
    const [favorites] = useState(JSON.parse(localStorage.getItem("favorites"))[firebaseAuth.currentUser.uid] || []);

    return (
        <>
            <Heading />
            <SectionHeading>Favorite Songs !</SectionHeading>
            {favorites.length === 0 ? (
                <p className="text-center">No Favorites</p>
            ) : (
                <SongContainer>
                    {favorites.map((song) => (
                        <MySongCard key={song.id} song={song} />
                    ))}
                </SongContainer>
            )}
        </>
    );
};

export default Favorites;
