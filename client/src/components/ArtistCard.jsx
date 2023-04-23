import React from "react";
import images from "../assets/images";

const ArtistCard = ({
    artist = { _id: "", name: "", imageURL: images.avatar },
    onClick,
    containerClass = "",
    textClass = "",
    imageClass = "",
}) => {
    return (
        <div
            onClick={onClick}
            className={
                containerClass +
                " flex flex-col gap-4 hover:text-black max-w-[170px] items-center justify-center pt-4 cursor-pointer hover:scale-105 transition-all active:scale-100"
            }
        >
            <img
                src={artist.imageURL}
                alt={artist.name}
                className={imageClass + " w-32 h-32 rounded-full object-cover"}
            />
            <p className={textClass + " text-center text-gray-800 "}>{artist.name}</p>
        </div>
    );
};

export default ArtistCard;
