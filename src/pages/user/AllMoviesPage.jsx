import React, { useEffect, useState } from 'react';
import MoviesCarousel from '../../components/Movie/MovieSlidesCarousel';
import { axiosInstance } from '../../config/axiosInstance';

function AllMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/shows/active-movies');
        setMovies(res.data.data || []);
      } catch (error) {
        console.error("Error fetching all upcoming movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='min-h-screen bg-base-100 pt-[120px]'>
      <div className="px-5 md:px-20 py-6">
        <h2 className="font-bold text-xl mb-10 sm:text-2xl md:text-4xl py-4 text-center">All Movies With Upcoming Shows</h2>

        {loading ? (
          <p className="text-center text-lg">Loading movies...</p>
        ) : movies.length === 0 ? (
          <p className="text-center text-lg">No upcoming movies found.</p>
        ) : (
          <MoviesCarousel movies={movies} />
        )}
      </div>
    </div>
  );
}

export default AllMoviesPage;
