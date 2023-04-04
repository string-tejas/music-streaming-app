import React from "react";
import "./SongCard.css";

const SongCard = ({ song }) => {
    console.log(" song : ", song);
    return (
        <div className="card-main-div">
            <div class="card ">
                <img className="card-img-top song-img" src={song.imageURL} alt="Card cap" />
                <div className="card-body">
                    <center>
                        <h5 class="text-base text-headingColor font-semibold  items-center">{song.name}</h5>
                    </center>
                </div>
                <ul className="list-group list-group-flush">
                    <li class="list-group-item">Artist : {song.artist}</li>
                    <li class="list-group-item">Album : {song.album}</li>
                    <li class="list-group-item">Category : {song.category}</li>
                </ul>
                <div class="card-body">
                    <span class="card-link">Plays : {song.count}</span>
                </div>
            </div>
            <br />
        </div>
    );
};

export default SongCard;
