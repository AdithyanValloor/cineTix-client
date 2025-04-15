import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

function WatchListPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWatchlist = async () => {
    try {
      const response = await axiosInstance.get('/watchlist');
      
      setWatchlist(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Failed to fetch watchlist", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      await axiosInstance.delete(`/watchlist/delete/${movieId}`);
      setWatchlist((prev) => prev.filter(item => item.movie._id !== movieId));
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Watchlist...</div>;
  }

  return (
    <div className="min-h-screen pt-[140px] md:pt-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-base-200">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">My Watchlist</h1>
  
      {watchlist.length === 0 ? (
        <p className="text-lg text-gray-500">You haven’t added any movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {watchlist.map((item) => (
            <div
              key={item._id}
              className="relative group border border-base-300 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg"
            >
              <Link to={`/movie-details/${item.movie?._id}`}>
                <div className="overflow-hidden">
                  <img
                    src={
                      (item.movie?.posters?.[1] || item.movie?.posters?.[0]) ??
                      "/default-movie.jpg"
                    }
                    alt={item.movie?.title || "Untitled Movie"}
                    className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-2 bg-base-100">
                  <h2 className="text-sm sm:text-base font-semibold truncate">
                    {item.movie?.title || "Untitled"}
                  </h2>
                </div>
              </Link>
  
              <button
                onClick={() => removeFromWatchlist(item.movie._id)}
                className="absolute top-2 right-2 bg-white text-red-600 p-1 rounded-full shadow hover:scale-110 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}

export default WatchListPage;
