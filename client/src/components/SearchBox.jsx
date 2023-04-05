import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBox = ({ className, handleSongSearch = () => {} }) => {
    const [search, setSearch] = React.useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        handleSongSearch(search);
        console.log("search : ", search);
    };

    return (
        <form onSubmit={handleSearch} className={className}>
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border-gray-300 shadow-sm focus:shadow-md border-2 rounded-lg bg-gray-50  focus:border-blue-500 outline-none "
                    placeholder="Search your favorite songs, artists or albums"
                    required
                />
                <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                    <BsSearch className="text-lg md:hidden" />
                    <span className="hidden md:inline">Search</span>
                </button>
            </div>
        </form>
    );
};

export default SearchBox;
