import { ChevronDown, Link, Search, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { CloseButton } from "./Button/Button";
import { axiosInstance } from "../config/axiosInstance";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";

// Search button
const SearchButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 cursor-pointer hover:scale-110 transition-all duration-200 hover:text-red-500"
      title="Search ( / )"
    >
      <Search className="stroke-2 lg:stroke-1" />
    </button>
  );
};

const highlightText = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="font-semiboldbold">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

// Search slide
const SearchSlide = ({
  showSearch,
  onClose,
  searchQuery,
  setSearchQuery,
  searchResults,
  loading,
}) => {
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleClick = (item) => {
    const path = item.type === "movie"
      ? `/movie-details/${item._id}`
      : `/theater-details/${item._id}`;
    navigate(path);
    onClose()
  };
  

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showSearch]);

  return (
    <>
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[5px] z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={clsx(
          "bg-base-100 base-content shadow-md w-full md:w-1/2 lg:w-1/4 h-full fixed top-0 right-0 transition-transform duration-500 z-50",
          showSearch ? "translate-x-0" : "translate-x-full"
        )}
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
              ref={inputRef}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="font-light p-2 pl-4 w-full rounded-full border border-gray-300 focus:outline-none"
            />
          </div>

          <div className="overflow-y-auto max-h-[70vh]">
            {loading && (
              <p className="text-center text-sm text-gray-400 animate-pulse">
                Searching...
              </p>
            )}
            {!loading && searchQuery && searchResults.length === 0 && (
              <p className="text-center text-gray-500 mt-10 animate-pulse">
                No results found
              </p>
            )}
            {!loading &&
              searchResults.map((item) => (
              <div
                key={item._id}
                className="p-2 px-3 bg-base-200 mb-1 cursor-pointer hover:bg-base-300 transition-all"
                onClick={() => handleClick(item)}
              >
                <p className="text-sm">
                  {highlightText(item.title || item.name, searchQuery)}
                </p>
                <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {item.type === "movie" ? "Movie" : "Theater"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const SearchComponent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const searchMoviesAndTheaters = async (query) => {
    try {
      setLoading(true);
      const trimmedQuery = query.trim();
      const movieResponse = await axiosInstance.get(
        `/movies?query=${encodeURIComponent(trimmedQuery)}`
      );
      const theaterResponse = await axiosInstance.get(
        `/theater/all-theaters-query?query=${encodeURIComponent(trimmedQuery)}`
      );
      const combinedResults = [
        ...movieResponse.data.data.map((item) => ({ ...item, type: "movie" })),
        ...theaterResponse.data.data.map((item) => ({
          ...item,
          type: "theater",
        })),
      ];
      setSearchResults(combinedResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowSearch(false);
    setSearchQuery("");
    setSearchResults([]);
  };
  

  // Debounced search
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      if (searchQuery.trim()) {
        searchMoviesAndTheaters(searchQuery.trim());
      } else {
        setSearchResults([]);
      }
    }, 400);

    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchQuery]);

  // Keyboard shortcut to open search with "/"
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "/" && !showSearch) {
        e.preventDefault();
        setShowSearch(true);
      } else if (e.key === "Escape" && showSearch) {
        handleClose();
      }
    };
  
    const handlePopState = () => {
      if (showSearch) {
        handleClose();
      }
    };
  
    // Listen to keydown events for "/" and "Escape"
    window.addEventListener("keydown", handleKeyPress);
  
    // Listen for "back" event on mobile (browser history changes)
    window.addEventListener("popstate", handlePopState);
  
    // Clean up the event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [showSearch]);
  

  return (
    <>
      <SearchButton onClick={() => setShowSearch(true)} />
      <SearchSlide
        showSearch={showSearch}
        onClose={handleClose}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        loading={loading}
      />
    </>
  );
};

export default SearchComponent;
