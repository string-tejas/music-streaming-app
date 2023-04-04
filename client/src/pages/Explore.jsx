import React from "react";
import { Heading } from "./Landing";
import SearchBox from "../components/SearchBox";
import SectionHeading from "../components/SectionHeading";
import SongContainer from "../components/SongContainer";
import { useStateValue } from "../context/StateProvider";
import MySongCard from "../components/MySongCard";

const Explore = () => {
    const [{ allSongs }] = useStateValue();
    return (
        <>
            <Heading />
            <div className="w-full bg-gradient-to-t from-blue-400 to-white">
                <SearchBox className={"mt-4 w-[max(270px,80%)] mx-auto"} />
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
            </div>
        </>
    );
};

export default Explore;
