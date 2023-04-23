import React, { useEffect, useState } from "react";
import { Heading } from "./Landing";
import { useParams } from "react-router-dom";
import { getArtistByName, getRecommendedSongs, getSongsByArtistName, updateSongCount } from "../api";
import ArtistCard from "../components/ArtistCard";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import MySongCard from "../components/MySongCard";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import ListContainer from "../components/ListContainer";
import SongListItem from "../components/SongListItem";
import { useAuth } from "../context/AuthContext";
import images from "../assets/images";
import { RxAvatar } from "react-icons/rx";
import { MdAlternateEmail } from "react-icons/md";

const Profile = () => {
    const { firebaseAuth } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState();
    const [recommendedSongs, setRecommendedSongs] = useState([]);
    const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();
    const [rLoading, setRLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (firebaseAuth.currentUser) {
            const obj = {
                name: firebaseAuth.currentUser.name || firebaseAuth.currentUser.displayName,
                imageURL: firebaseAuth.currentUser.photoURL || images.avatar,
                _id: firebaseAuth.currentUser.uid,
            };
            setUser(obj);
        }
        setLoading(false);
    }, [firebaseAuth]);

    useEffect(() => {
        var historyy = JSON.parse(localStorage.getItem("history") || "[]");
        setHistory(historyy?.reverse());
        setRLoading(true);
        getRecommendedSongs(historyy[0]?.name || "Shape Of You")
            .then((r) => {
                if (r && "ok" in r) {
                    console.log(r);
                } else {
                    console.log(r);
                    setRecommendedSongs(r);
                }
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

    if (loading) {
        return (
            <>
                <Heading />
                Loading...
            </>
        );
    }

    return (
        <>
            <Heading />

            <div className=" flex min-h-[calc(100vh-72px)]  flex-wrap md:flex-nowrap">
                <div className="bg-blue-50 shadow-md md:min-h-full  w-full md:w-[300px] pb-4 md:pb-0 flex flex-col items-center ">
                    <ArtistCard
                        artist={user}
                        textClass="text-2xl font-semibold"
                        imageClass="w-40 h-40"
                        containerClass="mt-8 hover:scale-100 cursor-default"
                    />
                    <div className="w-3/4 text-center mt-6 text-gray-600">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th colSpan={7} scope="col" class="px-6 py-3">
                                            Profile
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            colSpan={1}
                                        >
                                            <RxAvatar />
                                        </th>
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            colSpan={6}
                                        >
                                            {user?.name}
                                        </th>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <MdAlternateEmail />
                                        </th>
                                        <td class="px-6 py-4" colSpan={6}>
                                            {firebaseAuth?.currentUser?.email}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-auto md:flex-1">
                    <SectionHeading style={{ marginLeft: "36px" }}>Recents</SectionHeading>

                    <ListContainer>
                        {/* {songLoading && <p className="text-gray-400 text-center">Loading...</p>} */}
                        {history?.length === 0 && <p className="text-gray-400 text-center">No recents found</p>}
                        {history?.map((song, index) => {
                            return <SongListItem song={song} key={song._id} onClick={() => playSong(song, index)} />;
                        })}
                    </ListContainer>
                    <SectionHeading style={{ marginLeft: "36px" }}>Recommended</SectionHeading>

                    <ListContainer>
                        {rLoading && <p className="text-gray-400 text-center">Loading...</p>}
                        {recommendedSongs?.length === 0 && (
                            <p className="text-gray-400 text-center">No recents found</p>
                        )}
                        {recommendedSongs?.map((song, index) => {
                            return <SongListItem song={song} key={song._id} onClick={() => playSong(song, index)} />;
                        })}
                    </ListContainer>
                </div>
            </div>
        </>
    );
};

export default Profile;
