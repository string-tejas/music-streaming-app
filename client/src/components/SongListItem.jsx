import React from "react";
import moment from "moment";

const SongListItem = ({ song, onClick = () => {} }) => {
    return (
        <div
            onClick={onClick}
            className="w-full flex py-4 px-1 md:px-8 hover:bg-gray-100 active:bg-gray-200 select-none border-b-2 cursor-pointer transition-all"
        >
            <img
                className="rounded-full h-16 w-16 object-cover"
                src={song.imageURL || "https://ui-avatars.com/api/?font-size=0.33"}
                alt="lol"
            />
            <div className="ml-4 md:ml-12 flex-1">
                <h3 className="text-xl md:text-2xl font-semibold leading-none  mb-1">{song.name}</h3>
                <p>{song.album}</p>
            </div>
            <span>{moment.utc(moment.duration(song.duration_ms).as("milliseconds")).format("mm:ss")}</span>
        </div>
    );
};

export default SongListItem;
