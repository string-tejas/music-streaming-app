import React, { useEffect, useState } from "react";
import { Heading } from "./Landing";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import MySongCard from "../components/MySongCard";
import { updateSongCount } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { NavLink } from "react-router-dom";

const Home = () => {
    const [history, setHistory] = useState();
    const [{ user }] = useStateValue();
    const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();

    useEffect(() => {
        var historyy = JSON.parse(localStorage.getItem("history") || "[]");
        setHistory(historyy?.reverse());
    }, []);

    const onSongClick = (song, index) => {
        playSong(index);

        updateSongCount(song._id)
            .then((data) => {
                console.log(" data of success : ", data);
            })
            .catch((err) => console.log(" error in count : ", err));
    };
    const playSong = (index) => {
        // console.log("added", song);
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: history });
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
        </>
    );
};

export default Home;
