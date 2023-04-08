import React from "react";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import MySongCard from "../components/MySongCard";
import ArtistCard from "../components/ArtistCard";
import ArtistContainer from "../components/ArtistContainer";
import { useNavigate } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";

const Search = ({ songs = [], artists = [], albums = [], playSong = () => {}, searchLoading = true }) => {
    const navigate = useNavigate();
    console.log("albums", albums);

    const onArtistClick = (artistName) => {
        navigate(`/artist/${artistName}`);
    };

    return (
        <div>
            <SectionHeading>Songs</SectionHeading>
            <SongContainer noBottomGap>
                {searchLoading && <p className="text-gray-400 text-center">Loading...</p>}
                {songs?.length === 0 && !searchLoading && <p className="text-gray-400 text-center">No songs found</p>}
                {songs?.map((song, index) => {
                    return (
                        <MySongCard
                            song={song}
                            key={song._id}
                            onClick={() => playSong(song, index, songs)}
                            delay={index}
                        />
                    );
                })}
            </SongContainer>
            <SectionHeading>Artists</SectionHeading>
            <ArtistContainer noBottomGap>
                {searchLoading && <p className="text-gray-400 text-center">Loading...</p>}
                {artists?.length === 0 && !searchLoading && (
                    <p className="text-gray-400 text-center">No artists found</p>
                )}
                {artists?.map((artist) => {
                    console.log(artist);
                    return <ArtistCard artist={artist} key={artist._id} onClick={() => onArtistClick(artist.name)} />;
                })}
            </ArtistContainer>
            <SectionHeading>Albums</SectionHeading>
            <ArtistContainer>
                {searchLoading && <p className="text-gray-400 text-center">Loading...</p>}
                {albums?.length === 0 && !searchLoading && <p className="text-gray-400 text-center">No albums found</p>}
                {albums?.map((album) => {
                    return <AlbumCard album={album} key={album._id} />;
                })}
            </ArtistContainer>
        </div>
    );
};

export default Search;
