import React, { useEffect } from "react";
import { Heading } from "./Landing";
import SearchBox from "../components/SearchBox";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import { useStateValue } from "../context/StateProvider";
import MySongCard from "../components/MySongCard";
import { Route, Routes, useNavigate } from "react-router-dom";
import Search from "./Search";
import { exploreSongs, searchAll, updateSongCount } from "../api";
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

    const playSong = (song, index, collection) => {
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: collection });

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
        updateSongCount(song._id)
            .then((data) => {
                console.log(" data of success : ", data);
            })
            .catch((err) => console.log(" error in count : ", err));
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

const CategoryWiseSongs = ({ playSong }) => {
    const [catWiseSongs, setCatWiseSongs] = React.useState([]);

    useEffect(() => {
        exploreSongs().then((res) => {
            console.log("res : ", res);
            setCatWiseSongs(res);
        });
    }, []);

    return (
        <>
            {catWiseSongs.length > 0 &&
                catWiseSongs.map((cat, index) => {
                    return (
                        <React.Fragment key={cat._id}>
                            <SectionHeading>{cat._id}</SectionHeading>
                            <SongContainer noBottomGap={index !== catWiseSongs.length - 1}>
                                {cat.songs.map((song, index) => {
                                    return (
                                        <MySongCard
                                            song={song}
                                            key={song._id}
                                            onClick={() => {
                                                playSong(song, index, cat.songs);
                                            }}
                                            delay={index}
                                        />
                                    );
                                })}
                            </SongContainer>
                        </React.Fragment>
                    );
                })}
        </>
    );
};

export default Explore;
