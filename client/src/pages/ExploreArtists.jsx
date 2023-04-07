import React, { useEffect } from "react";
import ArtistContainer from "../components/ArtistContainer";
import SectionHeading from "../components/SectionHeading";
import { AllExploreCardElements } from "./Explore";
import { getAllArtist } from "../api";
import ArtistCard from "../components/ArtistCard";
import { useNavigate } from "react-router-dom";

const ExploreArtists = () => {
    const [artists, setArtists] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getAllArtist()
            .then((res) => {
                setArtists(res.artist);
            })
            .finally(() => setLoading(false));
    }, []);

    const onArtistClick = (artistName) => {
        navigate(`/artist/${artistName}`);
    };

    return (
        <>
            <AllExploreCardElements />
            <SectionHeading>Explore Artists</SectionHeading>
            <ArtistContainer>
                {loading && <h1>Loading...</h1>}
                {!loading && artists.length === 0 && <h1>No Artist Found</h1>}
                {artists.map((a) => (
                    <ArtistCard artist={a} key={a._id} onClick={() => onArtistClick(a.name)} />
                ))}
            </ArtistContainer>
        </>
    );
};

export default ExploreArtists;
