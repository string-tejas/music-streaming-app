import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import images from "../assets/images";
import { Link, NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsSpeedometer } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
    return (
        <>
            <Heading />

            <div className="px-6 py-8 md:px-24 md:py-16">
                <motion.section
                    initial={{
                        x: -120,
                        opacity: 0,
                    }}
                    exit={{
                        x: -120,
                        opacity: 0,
                    }}
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <h3 className="text-xl md:text-6xl pb-1">
                        Listen to your favorite <span className="font-bold text-blue-600">music</span>
                    </h3>
                    <h3 className="text-xl md:text-6xl font-semibold">Anytime, Anywhere.</h3>
                    <hr className="mt-4" />
                </motion.section>
                <section className="w-full flex flex-col gap-4 md:gap-12 md:flex-row mt-4 md:mt-12">
                    <motion.img
                        src={images.listenMusic}
                        className="md:w-8/12 w-full object-cover"
                        alt="listening music"
                        initial={{
                            y: 200,
                            opacity: 0,
                        }}
                        exit={{
                            y: 200,
                            opacity: 0,
                        }}
                        whileInView={{
                            y: 0,
                            opacity: 1,
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.div
                        initial={{
                            y: 200,
                            opacity: 0,
                        }}
                        exit={{
                            y: 200,
                            opacity: 0,
                        }}
                        whileInView={{
                            y: 0,
                            opacity: 1,
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="pt-1 md:pt-3 md:mt-0 text-xl font-semibold md:text-5xl">
                            Never Stop Listening.
                        </h1>
                        <div className="mt-4 text-base md:text-xl" style={{ fontFamily: "Roboto" }}>
                            Music is a powerful source of inspiration and joy that can be enjoyed anytime and anywhere.
                            Never stop listening to music, as it has the ability to enhance your mood and positively
                            impact your life.
                        </div>
                        <h1 className="pt-8 md:mt-0 text-xl font-semibold md:text-5xl">Benefits of Music</h1>
                        <ul
                            className="mt-4 text-base md:text-xl"
                            style={{ fontFamily: "Roboto", listStyleType: "circle", transform: "translateX(20px)" }}
                        >
                            <li>Mood enhancement</li>
                            <li>Stress reduction </li>
                            <li>Improved focus</li>
                            <li>Concentration</li>
                            <li>Enhanced creativity</li>
                        </ul>
                    </motion.div>
                </section>
            </div>
            <section className="w-full relative">
                <motion.img className="w-full h-[600px] object-cover" src={images.dj} alt="dj" />
                <div
                    className="absolute bottom-12 left-2 md:left-7 text-white text-3xl md:text-7xl"
                    style={{ textShadow: "0 0 2px white" }}
                >
                    Catch the latest music here !
                </div>
            </section>
        </>
    );
};

export const Heading = () => {
    const linkStyle =
        " text-[1rem] md:text-lg lg:text-xl w-[140px] md:w-auto text-blue-500 py-1 px-3 rounded-md hover:bg-blue-100 ";
    const selectedLink = "md:font-semibold underline bg-blue-100 md:bg-none";
    const [show, setShow] = useState(false);
    const { auth } = useAuth();

    return (
        <header className="w-full h-18 py-2 flex items-center shadow-md relative z-10">
            <img
                className="absolute h-full w-[500px]"
                src={images.wave2}
                alt="wave"
                style={{ transform: "scaleX(-1)", zIndex: "-2" }}
            />
            <div className="md:mx-12 flex items-center justify-between">
                <BiMenu className="md:hidden mx-2 text-[24px] text-white" onClick={() => setShow((prev) => !prev)} />
                <img className="h-9 md:h-14" src={images.logo} alt="logo" />
                <span
                    className="text-lg md:text-3xl font-bold ml-1 md:ml-4 text-white"
                    style={{ textShadow: "1px 1px 0 blue, -1px -1px 0 blue, 0 0 2px blue" }}
                >
                    musify
                </span>
            </div>
            <div className="ml-auto mr-1 md:mr-16 h-full flex gap-2 md:gap-4">
                <div
                    style={{
                        left: show ? "0" : "-100%",
                        transition: "250ms ease",
                    }}
                    className="fixed md:static w-[200px] md:w-auto h-full top-0 left-0  shadow-md md:shadow-none md:bg-none bg-[#fefefe] z-10"
                >
                    <div className="relative pt-12 md:pt-0 pl-4 md:pl-0 flex flex-col md:flex-row items-start md:gap-4 gap-2 lg:mr-14 md:items-center md:backdrop-blur-lg  ">
                        <div className="md:hidden absolute top-5 left-2" onClick={() => setShow(false)}>
                            <GrClose />
                        </div>
                        <img src={images.logo} alt="logo 2" className="w-20 h-20 self-center md:hidden" />
                        <div className="h-[1px] w-[90%] self-center bg-gray-600"></div>
                        <NavLink className={({ isActive }) => (isActive ? selectedLink + linkStyle : linkStyle)} to="/">
                            Home
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? selectedLink + linkStyle : linkStyle)}
                            to="/trending"
                        >
                            Trending
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? selectedLink + linkStyle : linkStyle)}
                            to="/explore"
                        >
                            Explore
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? selectedLink + linkStyle : linkStyle)}
                            to="/about"
                        >
                            About
                        </NavLink>
                    </div>
                </div>

                {auth ? (
                    <UserCard />
                ) : (
                    <>
                        <Link to="/register">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="border-2 text-sm md:text-base border-black rounded-full bg-white hover:border-blue-500 hover:text-blue-500 px-3 md:px-6 py-1 active:bg-slate-100"
                            >
                                Register
                            </motion.button>
                        </Link>
                        <Link to="/login">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="border-2 text-sm md:text-base border-blue-500 text-white rounded-full px-3 md:px-6 py-1 bg-blue-500 hover:border-gray-800 active:bg-blue-600"
                            >
                                Login
                            </motion.button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

const UserCard = () => {
    const [{ user }] = useStateValue();
    const { setAuth, firebaseAuth } = useAuth();

    const [isMenu, setIsMenu] = useState(false);

    const handleLogoutClick = async () => {
        await firebaseAuth.signOut().then(() => {
            setAuth(false);
        });
    };

    return (
        <div
            onMouseEnter={() => setIsMenu(true)}
            onMouseLeave={() => setIsMenu(false)}
            className="flex mr-2 items-center ml-auto z=[100] cursor-pointer backdrop-blur-sm gap-2 relative min-w-[100px] py-1 rounded-full border-2 hover:shadow-md hover:bg-white hover:border-gray-300"
        >
            <img
                src={user?.imageURL || images.avatar}
                className="w-[22px] md:w-[28px] object-cover rounded-full shadow-lg mx-1"
                alt="avatar"
                referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
                <p className="text-sm md:text-base text-textColor hover:text-headingColor font-semibold">
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
                        className="absolute z-[999] top-8 md:top-9 py-2 right-0 w-[160px] md:w-275 gap-2 bg-white shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
                    >
                        <NavLink to={"/profile"}>
                            <p className="text-base text-textColor  hover:bg-gray-200 pl-3 md:px-6 py-2 hover:font-semibold duration-150 transition-all ease-in-out flex items-center gap-4">
                                <CgProfile className="text-xl md:text-2xl" /> Profile
                            </p>
                        </NavLink>
                        {user?.role === "admin" && (
                            <NavLink to={"/dashboard/home"}>
                                <p className="text-base text-textColor  hover:bg-gray-200 pl-3 md:px-6 py-2 hover:font-semibold duration-150 transition-all ease-in-out flex items-center gap-4">
                                    <BsSpeedometer className="text-xl md:text-2xl" /> Dashboard
                                </p>
                            </NavLink>
                        )}
                        <NavLink to={"/favorites"}>
                            <p className="text-base text-textColor  hover:bg-gray-200 pl-3 md:px-6 py-2 hover:font-semibold duration-150 transition-all ease-in-out flex items-center gap-4">
                                <MdOutlineFavoriteBorder className="text-xl md:text-2xl" /> Favorites
                            </p>
                        </NavLink>

                        <hr />
                        <p
                            onClick={handleLogoutClick}
                            className="text-base text-textColor  hover:bg-gray-200 pl-3 md:px-6 py-2 hover:font-semibold duration-150 transition-all ease-in-out flex items-center gap-4"
                        >
                            <BiLogOut className="text-xl md:text-2xl" />
                            Log Out
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Landing;
