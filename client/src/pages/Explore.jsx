import React, { useEffect } from "react";
import { Heading } from "./Landing";
import SearchBox from "../components/SearchBox";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import { useStateValue } from "../context/StateProvider";
import MySongCard from "../components/MySongCard";
import { Route, Routes, useNavigate } from "react-router-dom";
import Search from "./Search";
import { exploreSongs, searchAll } from "../api";
import { actionType } from "../context/reducer";

const Explore = () => {
    const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();
    const [searchLoading, setSearchLoading] = React.useState(false);

    const [searchResult, setSearhResult] = React.useState({
        songs: [],
        artists: [],
        albums: [],
    });

    const navigate = useNavigate();

    const onSearch = async (search) => {
        console.log("search : ", search);
        setSearchLoading(true);
        const res = await searchAll(search);
        console.log("res : ", res);
        setSearhResult(res);
        setSearchLoading(false);
        navigate(`/explore/search`, { state: { search } });
    };

    const playSong = (song, index) => {
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: searchResult.songs });

        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_IS_SONG_PLAYING,
                isSongPlaying: true,
            });
        }

        if (songIndex !== index) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: index,
            });
        }
    };

    return (
        <>
            <Heading />
            <div className="w-full  ">
                <SearchBox handleSongSearch={onSearch} className={"mt-4 w-[max(270px,80%)] mx-auto"} />
                <Routes>
                    <Route path="/" element={<CategoryWiseSongs allSongs={allSongs} playSong={playSong} />} />
                    <Route
                        path="/search"
                        element={
                            <Search
                                songs={searchResult.songs}
                                albums={searchResult.albums}
                                artists={searchResult.artists}
                                playSong={playSong}
                                searchLoading={searchLoading}
                            />
                        }
                    />
                </Routes>
            </div>
        </>
    );
};

const CategoryWiseSongs = ({ allSongs }) => {
    const [songs, setSongs] = React.useState([]);

    useEffect(() => {
        exploreSongs().then((res) => {
            console.log("res : ", res);
        });
    }, []);

    return (
        <>
            <SectionHeading>Indian Classical</SectionHeading>
            <SongContainer noBottomGap>
                {allSongs
                    ?.filter((song) => song.category === "Indian classical")
                    ?.map((song, index) => {
                        return (
                            <MySongCard
                                song={song}
                                key={song._id}
                                // onClick={() => onSongClick(song, index)}
                                delay={index}
                            />
                        );
                    })}
            </SongContainer>
            <SectionHeading>Indi Pop</SectionHeading>
            <SongContainer noBottomGap>
                {allSongs
                    ?.filter((song) => song.category === "Indi-pop")
                    ?.map((song, index) => {
                        return (
                            <MySongCard
                                song={song}
                                key={song._id}
                                // onClick={() => onSongClick(song, index)}
                                delay={index}
                            />
                        );
                    })}
            </SongContainer>
        </>
    );
};

export default Explore;
