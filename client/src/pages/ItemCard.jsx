import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import {
  deleteAlbumById,
  deleteArtistById,
  deleteSongById,
  getAllAlbums,
  getAllArtist,
  getAllSongs,
} from "../api";
import { useStateValue } from "../context/StateProvider";
import AlertSuccess from "../components/AlertSuccess";
import AlertError from "../components/AlertError";
import { actionType } from "../context/reducer";
import { storage } from "../config/firebase.config";
import { ref, deleteObject } from "firebase/storage";

const SongCard = ({ data, type, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [alert, setAlert] = useState(null);
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();

  const deleteItem = async () => {
    if (type === "song") {
      // deleting song image and audio
      const audioRef = ref(storage, data.songURL);
      const imageRef = ref(storage, data.imageURL);

      await deleteObject(audioRef).then(() => {
        console.log("deleted audio");
      });

      await deleteObject(imageRef).then(() => {
        console.log("delted image ?");
      });

      const res = await deleteSongById(data._id);
      setIsDelete(false);

      if (res.data.success) {
        setAlert("success");
        getAllSongs().then((songs) => {
          dispatch({ type: actionType.SET_ALL_SONGS, allSongs: songs.song });
        });
      } else {
        setAlert("error");
        setIsDelete(false);
      }
    } else if (type === "album") {
      const res = await deleteAlbumById(data._id);
      setIsDelete(false);
      const iref = ref(storage, data.imageURL);
      await deleteObject(iref);

      if (res.data.success) {
        setAlert("success");
        getAllAlbums().then((songs) => {
          console.log(songs);
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: songs.albums,
          });
        });
      } else {
        setAlert("error");
        setIsDelete(false);
      }
    } else if (type === "artist") {
      const res = await deleteArtistById(data._id);
      const iref = ref(storage, data.imageURL);
      await deleteObject(iref);

      setIsDelete(false);
      if (res.data.success) {
        setAlert("success");
        getAllArtist().then((songs) => {
          dispatch({ type: actionType.SET_ARTISTS, artists: songs.artist });
        });
      } else {
        setAlert("error");
        setIsDelete(false);
      }
    }
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <motion.div className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center">
      <div className="w-40 h-40 min-w-[160px] min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          src={data.imageURL}
          whileHover={{ scale: 1.05 }}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className="text-base text-headingColor font-semibold my-2 ">
        {data.name?.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
        <span className="block text-sm text-gray-400 my-1">
          {data.artist?.length > 25
            ? `${data.artist.slice(0, 25)}...`
            : data.artist}
        </span>
      </p>

      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i
          className="text-base text-red-400 drop-shadow-md hover:text-red-600"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsDelete(true)}
        >
          <IoTrash />
        </motion.i>
      </div>

      {isDelete && (
        <motion.div
          className="absolute inset-0 backdrop-blur-sm bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
        >
          <p className="text-center text-lg text-headingColor font-semibold">
            Are you sure you want to delete this item ?
          </p>
          <div className="flex items-center gap-4 mt-4">
            <motion.button
              className="px-2 py-1 text-sm uppercase bg-red-500 rounded-md hover:bg-red-700 transition-all cursor-pointer text-white"
              whileTap={{ scale: 0.9 }}
              onClick={deleteItem}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm uppercase bg-blue-500 hover:bg-blue-700 text-white rounded-md"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDelete(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
      {alert && (
        <>
          {alert === "success" ? (
            <AlertSuccess msg={"Deleted Successfully"} />
          ) : (
            <AlertError msg={"Could Not delete"} />
          )}
        </>
      )}
    </motion.div>
  );
};

export default SongCard;
