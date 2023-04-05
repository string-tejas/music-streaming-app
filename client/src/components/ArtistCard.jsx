import React from "react";

const ArtistCard = ({ artist = { _id: "", name: "", imageURL: "" } }) => {
    return (
        <div className="flex flex-col gap-4 hover:text-black max-w-[170px] items-center justify-center pt-4 cursor-pointer hover:scale-105 transition-all active:scale-100">
            <img src={artist.imageURL} alt={artist.name} className="w-32 h-32 rounded-full" />
            <p className="text-center text-gray-800 ">{artist.name}</p>
        </div>
    );
};

export default ArtistCard;
