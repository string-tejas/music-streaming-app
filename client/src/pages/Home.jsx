import React, { useEffect, useState } from "react";
import { Heading } from "./Landing";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import MySongCard from "../components/MySongCard";
import { getRecommendedSongs, updateSongCount } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { NavLink } from "react-router-dom";
import ListContainer from "../components/ListContainer";
import SongListItem from "../components/SongListItem";

const Home = () => {
    const [history, setHistory] = useState();
    const [{ user }] = useStateValue();
    const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();

    const [recommendedSongs, setRecommendedSongs] = useState([]);
    const [rLoading, setRLoading] = useState(false);

    useEffect(() => {
        var historyy = JSON.parse(localStorage.getItem("history") || "[]");
        setHistory(historyy?.reverse());
        setRLoading(true);
        getRecommendedSongs(historyy[0]?.name || "Shape Of You")
            .then((r) => {
                console.log(r);
                setRecommendedSongs(r);
            })
            .finally(() => setRLoading(false));
    }, []);

    const onSongClick = (song, index) => {
        playSong(index);

        updateSongCount(song._id)
            .then((data) => {
                console.log(" data of success : ", data);
            })
            .catch((err) => console.log(" error in count : ", err));
    };
    const playSong = (index, collection = history) => {
        // console.log("added", song);
        console.log("playsong", index, collection);
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
    };

    return (
        <>
            <Heading />

            <SectionHeading>Continue Listening</SectionHeading>
            <SongContainer noBottomGap>
                {history?.length > 0 &&
                    history?.map((song, index) => {
                        return (
                            <MySongCard
                                song={song}
                                key={song._id}
                                onClick={() => onSongClick(song, index)}
                                delay={index}
                            />
                        );
                    })}
            </SongContainer>
            <SectionHeading>Recommended For you</SectionHeading>
            {rLoading && <h3 className="text-center">Loading...</h3>}
            {!rLoading && recommendedSongs?.length === 0 && (
                <h3 className="text-center">Try listening Song to get recommendations</h3>
            )}
            {!rLoading && recommendedSongs.length > 0 && (
                <ListContainer className={"m-auto md:px-16"}>
                    {recommendedSongs?.map((song, index) => {
                        return (
                            <SongListItem
                                song={song}
                                key={song._id}
                                onClick={() => playSong(index, recommendedSongs)}
                                delay={index}
                            />
                        );
                    })}
                </ListContainer>
            )}
        </>
    );
};

export default Home;
