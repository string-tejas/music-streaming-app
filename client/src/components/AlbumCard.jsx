import React from "react";

const AlbumCard = ({
    album = { _id: "", name: "", imageURL: "" },
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
            <img src={album.imageURL} alt={album.name} className={imageClass + " w-32 h-32 rounded-sm object-cover"} />
            <p className={textClass + " text-center text-gray-800 "}>{album.name}</p>
        </div>
    );
};

export default AlbumCard;
