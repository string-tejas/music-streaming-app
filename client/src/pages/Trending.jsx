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
    const [{ isSongPlaying, songIndex }, dispatch] = useStateValue();
    const [trendingSongs, setTrendingSongs] = React.useState([]);

    useEffect(() => {
        getTrendingSongs()
            .then((data) => {
                // dispatch({ type: actionType.SET_ALL_SONGS, allSongs: data.data.song });
                setTrendingSongs(data.data.song);
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
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: trendingSongs });

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
            <div className="">
                <SectionHeading>
                    Trending Songs <BsFire className="ml-2" style={{ color: "#e5915d" }} />
                </SectionHeading>
                <SongContainer>
                    {trendingSongs?.map((song, index) => {
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
