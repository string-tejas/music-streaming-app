import { BsFire } from "react-icons/bs";
import { motion } from "framer-motion";

const MySongCard = ({ song, onClick = () => {}, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",

                    delay: delay * 0.1,
                },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="bg-white relative hover:bg-gray-200 shadow-[0_0_2px_black] rounded-lg transition-all cursor-pointer hover:shadow-[0_3px_10px_rgb(0,0,0,0.2),_0_0_4px_#333] "
        >
            <div className="relative">
                <img
                    src={song.imageURL}
                    alt="song cover"
                    className="rounded-tl-lg rounded-tr-lg h-[240px] w-full object-cover"
                />

                <span className="ml-1 absolute left-1 bottom-2 mt-2 text-sm bg-blue-900 inline-block text-white px-3 py-[1px] rounded-full">
                    {song.category}
                </span>
            </div>
            <h2 className="pt-1 pb-[1px] px-3 font-semibold text-2xl m-0">{song.name}</h2>
            <h3 className=" px-3 pb-1 text-base text-[#777] " style={{ lineHeight: "0.9" }}>
                By {song.artist || "artist"}
            </h3>

            <h3 className="px-3 pb-1 mt-1 mb-2 text-base text-[#484848] " style={{ lineHeight: "0.9" }}>
                Album: {song.album || "album"}
            </h3>
            <div className="absolute bottom-2 right-2 bg-red-500 px-1 py-[1px] text-sm flex items-center justify-center min-w-[50px] rounded-full text-white">
                <BsFire className="mr-2" style={{ color: "#ffe358" }} />
                <span>{song.count}</span>
            </div>
        </motion.div>
    );
};

export default MySongCard;
