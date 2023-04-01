import React, { useEffect } from "react";
import { getAllUsers } from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-200">
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-xl text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) =>
        dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.data })
      );
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
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
    </div>
  );
};

export default DashboardHome;
