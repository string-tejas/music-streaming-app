import React, { useEffect } from "react";
import { Heading } from "./Landing";
import SearchBox from "../components/SearchBox";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import { useStateValue } from "../context/StateProvider";
import MySongCard from "../components/MySongCard";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { exploreSongs, searchAll, updateSongCount } from "../api";
import { actionType } from "../context/reducer";
import { BiAlbum } from "react-icons/bi";
import { FaMicrophoneAlt, FaMusic } from "react-icons/fa";
import images from "../assets/images";
import ExploreArtists from "./ExploreArtists";
import ExploreAlbums from "./ExploreAlbums";

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
                    <Route path="/artists" element={<ExploreArtists />} />
                    <Route path="/albums" element={<ExploreAlbums />} />
                </Routes>
            </div>
        </>
    );
};

export const AllExploreCardElements = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const exploreArtist = () => (
        <ExploreCard
            icon={<FaMicrophoneAlt className="hidden md:block text-[100px] text-[#ffeaec]" />}
            style={{ background: `#ea2139 url(${images.waveRed})`, backgroundSize: "cover" }}
            className="bg-gradient-to-r from-[#93291e] to-[#ea2139]"
            text="Explore Artists"
            subText={"All your favorite artists at one place"}
            onClick={() => navigate("/explore/artists")}
        />
    );

    const exploreAlbum = () => (
        <ExploreCard
            icon={<BiAlbum className="hidden md:block text-[100px] text-[#e9ffe9]" />}
            className="bg-gradient-to-r from-[#03b099] to-[#91c840]"
            style={{ background: `url(${images.waveGreen})` }}
            text="Explore Albums"
            subText={"All your favorite albums at one place"}
            onClick={() => navigate("/explore/albums")}
        />
    );

    const exploreSongs = () => (
        <ExploreCard
            icon={<FaMusic className="hidden md:block text-[90px] mr-2 text-[#4e6ce4]" />}
            style={{ background: `#e2f4ff url(${images.wave2})`, backgroundSize: "cover" }}
            text="Explore Songs"
            subText={"All your favorite songs at one place"}
            onClick={() => navigate("/explore")}
        />
    );

    return (
        <div className="w-5/6 m-auto mt-8 flex gap-4 md:gap-12 justify-between flex-wrap">
            {location.pathname !== "/explore" && exploreSongs()}
            {location.pathname !== "/explore/artists" && exploreArtist()}
            {location.pathname !== "/explore/albums" && exploreAlbum()}
        </div>
    );
};

const ExploreCard = ({ className = "", icon = null, style = {}, text = "Explore", subText, onClick = () => {} }) => {
    return (
        <div
            style={style}
            onClick={onClick}
            className={
                className +
                " bg-red-50 flex-1 px-10 py-6 rounded-3xl flex shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.02] transition-all items-center"
            }
        >
            {icon}
            <div className="flex flex-col h-full" style={{ textShadow: "0 0 2px black" }}>
                <span className="ml-3 text-[32px] md:text-[40px] font-semibold text-white leading-none mb-3">
                    {text}
                </span>
                <span className="ml-3 text-[18px] md:text-[20px] text-white leading-none">{subText}</span>
            </div>
        </div>
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
            <AllExploreCardElements />
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
