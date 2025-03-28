import { ChevronDown, Search, X } from "lucide-react";
import React, { useState } from "react";
import { CloseButton } from "./Button/Button";

const SearchButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="p-2 cursor-pointer hover:scale-110 transition-all duration-200 hover:text-red-500">
      <Search className="stroke-2 lg:stroke-1" />
    </button>
  );
};

const SearchSlide = ({ showSearch, onClose }) => {
  return (
    <div>
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[5px] z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`bg-base-100 base-content shadow-md w-full md:w-1/2 lg:w-1/4 h-full fixed top-0 right-0 transition-transform duration-500 z-50 
        ${showSearch ? "translate-x-0" : "translate-x-full"}`}
        >
        {/* <button
          onClick={onClose}
          className="p-2 cursor-pointer rounded-full m-3 absolute right-0 scale-125 transition-all duration-500 hover:rotate-180"
        >
          <X strokeWidth={1} />
        </button> */}

        <div className="flex items-center">
          <CloseButton onClick={onClose}/>
          <p className="w-full p-5 text-base border-b border-gray-400">SEARCH FOR MOVIES & THEATERS</p>
        </div>


        <div className="w-full p-5 flex flex-col gap-5">

          {/* Search box */}
          <div className="relative flex items-center">
            <button className="absolute right-1 rounded-full p-2">
              <Search strokeWidth={1} />
            </button>
            <input
              name="search-box"
              id="search-box"
              type="text"
              placeholder="Search "
              className="font-light p-2 pl-4 w-full rounded-full border border-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex gap-1">
            {/* Languages */}
            <div className="relative flex items-center w-full">
              <ChevronDown strokeWidth={1} className="absolute right-3 pointer-events-none" />
              <select
                name="categories"
                id="categories"
                className="cursor-pointer p-2 bg-base-100 font-light w-full rounded-full pl-4 appearance-none border border-gray-300 focus:outline-none"
              >
                {["All languages", "English ", "Hindi", "Malayalam", "Tamil", "Telugu", "Kannada"].map((category) => (
                  <option
                    key={category}
                    className="font-light"
                    value={category.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Genres */}
            <div className="relative flex items-center w-full">
              <ChevronDown strokeWidth={1} className="absolute right-3 pointer-events-none" />
              <select
                name="categories"
                id="categories"
                className="cursor-pointer p-2 bg-base-100 font-light w-full rounded-full pl-4 appearance-none border border-gray-300 focus:outline-none"
              >
                {["All Genres", "Action ", "Thriller", "Mystery", "Crime", "Sci-fi", "Animation","Comedy", "Adventure ", "Comedy ", "Horror"].map((category) => (
                  <option
                    key={category}
                    className="font-light"
                    value={category.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

const SearchComponent = () => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchSlide = () => setShowSearch((prev) => !prev);

  return (
    <>
      <SearchButton onClick={handleSearchSlide} />
      <SearchSlide showSearch={showSearch} onClose={handleSearchSlide} />
    </>
  );
};

export default SearchComponent;
