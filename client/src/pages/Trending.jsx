import React, { useEffect } from "react";
import { Heading } from "./Landing";
import { getTrendingSongs, updateSongCount } from "../api";
// import SongCard from "../components/SongCard";
import { BsFire } from "react-icons/bs";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import MySongCard from "../components/MySongCard";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Trending = () => {
    const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();

    useEffect(() => {
        getTrendingSongs()
            .then((data) => {
                dispatch({ type: actionType.SET_ALL_SONGS, allSongs: data.data.song });
            })
            .catch((err) => console.log(" error in trending : ", err));
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
            <div className="bg-gradient-to-t from-blue-400 to-white">
                <SectionHeading>
                    Trending Songs <BsFire className="ml-2" style={{ color: "#e5915d" }} />
                </SectionHeading>
                <SongContainer>
                    {allSongs?.map((song, index) => {
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
            </div>
        </>
    );
};

export default Trending;
