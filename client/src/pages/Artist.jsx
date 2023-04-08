import React, { useEffect } from "react";
import { Heading } from "./Landing";
import { useParams } from "react-router-dom";
import { getArtistByName, getSongsByArtistName, updateSongCount } from "../api";
import ArtistCard from "../components/ArtistCard";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import MySongCard from "../components/MySongCard";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import ListContainer from "../components/ListContainer";
import SongListItem from "../components/SongListItem";

const Artist = () => {
    const params = useParams();
    const [artist, setArtist] = React.useState(null);
    const [songs, setSongs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [songLoading, setSongLoading] = React.useState(true);
    const [notFound, setNotFound] = React.useState(false);

    const [{ isSongPlaying, songIndex }, dispatch] = useStateValue();

    useEffect(() => {
        setLoading(true);
        getArtistByName(params.name)
            .then((res) => {
                setArtist(res.artist);
                setSongLoading(true);
                getSongsByArtistName(res.artist?.name)
                    .then((sRes) => {
                        setSongs(sRes.song);
                    })
                    .catch((e) => console.log(e))
                    .finally(() => setSongLoading(false));
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, []);

    const playSong = (song, index) => {
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: songs });

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
            {!artist && notFound && (
                <p className="text-gray-400 text-center text-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    Artist not found
                </p>
            )}
            {!loading && artist && (
                <div className=" flex min-h-[calc(100vh-72px)]  flex-wrap md:flex-nowrap">
                    <div className="bg-blue-50 shadow-md md:min-h-full  w-full md:w-[300px] pb-4 md:pb-0 flex flex-col items-center ">
                        <ArtistCard
                            artist={artist}
                            textClass="text-2xl font-semibold"
                            imageClass="w-40 h-40"
                            containerClass="mt-8 hover:scale-100 cursor-default"
                        />
                        <div className="w-3/4 text-center mt-6 text-gray-600">
                            {artist.name} are an singer . They are know for Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                        </div>
                    </div>
                    <div className="w-full md:w-auto md:flex-1">
                        <SectionHeading style={{ marginLeft: "36px" }}>Songs By {artist?.name}</SectionHeading>

                        <ListContainer>
                            {songLoading && <p className="text-gray-400 text-center">Loading...</p>}
                            {songs?.length === 0 && !songLoading && (
                                <p className="text-gray-400 text-center">No songs found</p>
                            )}
                            {songs?.map((song, index) => {
                                return (
                                    <SongListItem song={song} key={song._id} onClick={() => playSong(song, index)} />
                                );
                            })}
                        </ListContainer>
                    </div>
                </div>
            )}
        </>
    );
};

export default Artist;
