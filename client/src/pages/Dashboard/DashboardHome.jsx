import React, { useEffect, useState } from "react";
import { getAllArtist, getAllSongs, getAllUsers } from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { FaMusic, FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { BsFillPlayFill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-200">
     <center> {icon}</center> 
     <center> <p className="text-xl text-textColor font-semibold">{name}</p> </center> 
     <center> <p className="text-xl text-textColor">{count}</p> </center> 
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, artists, allAlbums,allStreams }, dispatch] =
    useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) =>
        dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.data })
      );
    }
    if(!allSongs) {
   
      getAllSongs().then((data) => {
      var count = 0;
          if(data.song) {
            data.song.map((song, index) => {
              count = count + song.count;
            })
            dispatch({type : actionType.SET_ALL_STREAMS, allStreams : count})
            
          }
          dispatch({ type : actionType.SET_ALL_SONGS, allSongs : data.song})
      })
    }
    if(!artists) {
      getAllArtist().then(data => {
  
        dispatch({type : actionType.SET_ARTISTS, artists : data.artist})
        console.log("artists data : ",artists?.length);
      })
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard
        icon={<FaUsers className="text-3xl text-textColor" />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      />

      <DashboardCard 
      icon={<BsFillPlayFill className="text-3xl text-textColor" />}
      name={"Streams"}
      count={allStreams > 0 ? allStreams : 0}  />

      <DashboardCard  
      icon={<FaMusic className="text-3xl text-textColor" />}
      name={"Songs"}
      count={allSongs?.length > 0 ? allSongs?.length : 0} />

      <DashboardCard 
      icon={<MdVerifiedUser className="text-3xl text-textColor" />}
      name={"Arists"}
      count={artists?.length > 0 ? artists?.length : 0} />
    </div>
  );
};

export default DashboardHome;
