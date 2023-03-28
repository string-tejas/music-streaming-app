import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import images from "../assets/images";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { useStateValue } from "../context/StateProvider";
import { useAuth } from "../context/AuthContext";
import { CgProfile } from "react-icons/cg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsSpeedometer } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [{ user }] = useStateValue();
  const { setAuth, firebaseAuth } = useAuth();

  const [isMenu, setIsMenu] = useState(false);

  const handleLogoutClick = async () => {
    await firebaseAuth.signOut().then(() => {
      setAuth(false);
    });
  };

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <img src={images.logo} alt={"Logo"} className="w-16" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink to="/home" className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}>
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink to="/music" className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}>
            Music
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink to="/about" className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}>
            About
          </NavLink>
        </li>
      </ul>
      <div
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative min-w-[150px] py-2 rounded-lg border-2 hover:shadow-md hover:bg-white hover:border-gray-300"
      >
        <img
          src={user?.imageURL || images.avatar}
          className="w-8 min-w-[36px] object-cover rounded-full shadow-lg mx-3"
          alt="avatar"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor hover:text-headingColor font-semibold">
            {user?.name || user?.displayName || "User"}
          </p>
        </div>
        <AnimatePresence>
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50, dur: 10 }}
              key="header-menu"
              className="absolute z-10 top-14 py-2 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
            >
              <NavLink to={"/profile"}>
                <p className="text-base text-textColor  hover:bg-gray-200 px-6 py-2 hover:font-semibold duration-150 transition-all ease-in-out flex items-center gap-4">
                  <CgProfile className="text-2xl" /> Profile
                </p>
              </NavLink>
              {user?.role === "admin" && (
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor  hover:bg-gray-200 px-6 py-2 hover:font-semibold duration-150 transition-all ease-in-out flex items-center gap-4">
                    <BsSpeedometer className="text-2xl" /> Dashboard
                  </p>
                </NavLink>
              )}
              <NavLink to={"/favorites"}>
                <p className="text-base text-textColor  hover:bg-gray-200 px-6 py-2 hover:font-semibold duration-150 transition-all ease-in-out flex items-center gap-4">
                  <MdOutlineFavoriteBorder className="text-2xl" /> Favorites
                </p>
              </NavLink>

              <hr />
              <p
                onClick={handleLogoutClick}
                className="text-base text-textColor  hover:bg-gray-200 px-6 py-2 hover:font-semibold duration-150 transition-all ease-in-out flex items-center gap-4"
              >
                <BiLogOut className="text-2xl" />
                Log Out
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
