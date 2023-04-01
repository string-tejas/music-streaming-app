import React, { useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import { getAllArtist } from "../../api";
import { actionType } from "../../context/reducer";
import { NavLink } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import SongCard from "../ItemCard";

const DashboardArtists = () => {
  const [{ artists }, dispath] = useStateValue();

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispath({
          type: actionType.SET_ARTISTS,
          artists: data.artist,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink
          to={"/dashboard/addArtist"}
          className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300
       hover:border-gray-500 hover:shadow-md cursor-pointer"
        >
          <IoAdd style={{ marginRight: "4px" }} /> Add Artist
        </NavLink>
        <NavLink
          to={"/dashboard/artistRequest"}
          className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300
       hover:border-gray-500 hover:shadow-md cursor-pointer"
        >
          Artists Requests
        </NavLink>
      </div>
      <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count : {artists?.length}
            </span>
          </p>
        </div>
        <ArtistContainer data={artists} />
      </div>
    </div>
  );
};

export const ArtistContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-even">
      {data &&
        data.map((song, i) => {
          return (
            <SongCard key={song._id} data={song} index={i} type="artist" />
          );
        })}
    </div>
  );
};

export default DashboardArtists;
