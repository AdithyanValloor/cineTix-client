import { ChevronDown, Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { CloseButton } from "./Button/Button";
import axios from "axios";
import { axiosInstance } from "../config/axiosInstance";

// Search button component to trigger the search slide
const SearchButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 cursor-pointer hover:scale-110 transition-all duration-200 hover:text-red-500"
    >
      <Search className="stroke-2 lg:stroke-1" />
    </button>
  );
};

// Search slide component that handles the search overlay
const SearchSlide = ({ showSearch, onClose, searchQuery, setSearchQuery, searchResults }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[5px] z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`bg-base-100 base-content shadow-md w-full md:w-1/2 lg:w-1/4 h-full fixed top-0 right-0 transition-transform duration-500 z-50 ${showSearch ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-400">
          <CloseButton onClick={onClose} />
          <p className="w-full text-base">SEARCH FOR MOVIES & THEATERS</p>
        </div>

        <div className="w-full p-5 flex flex-col gap-5">
          <div className="relative flex items-center">
            <button className="absolute right-1 rounded-full p-2">
              <Search strokeWidth={1} />
            </button>
            <input
              name="search-box"
              id="search-box"
              type="text"
              value={searchQuery} 
              onChange={handleSearchChange} 
              placeholder="Search "
              className="font-light p-2 pl-4 w-full rounded-full border border-gray-300 focus:outline-none"
            />
          </div>
          
          {/* Display search results */}
          {searchResults && searchResults.length > 0 ? (
            <div className="mt-4">
              <h3 className="font-semibold">Search Results:</h3>
              <div>
                {searchResults.map((item) => (
                  <div key={item._id} className="p-2 border-b">
                    <p>{item.name || item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            searchQuery && <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Search component that holds the logic for toggling the search slide
const SearchComponent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to fetch search results from the backend
  const searchMoviesAndTheaters = async (query) => {
    try {
      const movieResponse = await axiosInstance.get(`/movies?query=${query}`);
      const theaterResponse = await axiosInstance.get(`/theater/all-theaters-query?query=${query}`);
      setSearchResults([
        ...movieResponse.data.data,
        ...theaterResponse.data.data,
      ]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Use effect to trigger search on query change
  useEffect(() => {
    if (searchQuery) {
      searchMoviesAndTheaters(searchQuery);
    } else {
      setSearchResults([]); // Clear results when query is empty
    }
  }, [searchQuery]);

  const handleSearchSlide = () => setShowSearch((prev) => !prev);

  return (
    <>
      <SearchButton onClick={handleSearchSlide} />
      <SearchSlide
        showSearch={showSearch}
        onClose={handleSearchSlide}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
      />
    </>
  );
};

export default SearchComponent;
