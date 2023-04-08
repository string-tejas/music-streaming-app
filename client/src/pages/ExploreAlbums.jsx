import React, { useEffect } from "react";
import Albums from "../components/ArtistContainer";
import SectionHeading from "../components/SectionHeading";
import { AllExploreCardElements } from "./Explore";
import { getAllAlbums, getAllArtist } from "../api";
import ArtistCard from "../components/ArtistCard";
import { useNavigate } from "react-router-dom";
import ArtistContainer from "../components/ArtistContainer";
import AlbumCard from "../components/AlbumCard";

const ExploreAlbums = () => {
    const [albums, setAlbums] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getAllAlbums()
            .then((res) => {
                setAlbums(res.albums);
            })
            .finally(() => setLoading(false));
    }, []);

    const onAlbumClick = (albumName) => {
        navigate(`/albumn/${albumName}`);
    };

    return (
        <>
            <AllExploreCardElements />
            <SectionHeading>Explore Albums</SectionHeading>
            <ArtistContainer>
                {loading && <h1>Loading...</h1>}
                {!loading && albums.length === 0 && <h1>No Artist Found</h1>}
                {albums.map((a) => (
                    <AlbumCard album={a} key={a._id} onClick={() => onAlbumClick(a.name)} />
                ))}
            </ArtistContainer>
        </>
    );
};

export default ExploreAlbums;
