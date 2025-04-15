import React, { useEffect, useState } from 'react';
import ImageCarousel from '../../components/Movie/TopCarousel';
import MoviesCarousel from '../../components/Movie/MovieSlidesCarousel';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state) => state.user);

  if (!userData) return <Navigate to="/login" />;
  if (userData.role === "exhibitor") return <Navigate to="/exhibitor/dashboard" />;
  if (userData.role === "admin") return <Navigate to="/admin/dashboard" />;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let city = localStorage.getItem('selectedCity');
  
        if (!city && userData) {
          try {
            const cityRes = await axiosInstance.get('/locations/user-city');
            city = cityRes?.data?.city;
          } catch (cityErr) {
            console.warn('Could not get user city:', cityErr);
          }
        }
  
        let res;
        if (city) {
          res = await axiosInstance.get(`/shows/movies-by-location?location=${encodeURIComponent(city)}`);
        } else {
          res = await axiosInstance.get(`/shows/active-movies`);
        }
  
        setMovies(res.data.data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovies();
  
   
    const onCityChange = () => {
      fetchMovies();
    };
  
    window.addEventListener('cityChanged', onCityChange);
  
    return () => {
      window.removeEventListener('cityChanged', onCityChange);
    };
  }, [userData]);
  

  return (
    <div className='w-full h-full pt-[150px] md:pt-20 bg-base-300'>
      <ImageCarousel />

      <div className='px-4 py-6 lg:px-24'>
        <p className='lg:text-3xl font-bold text-center p-2 lg:p-5'>Recommended Movies</p>
        {loading ? (
          <p className="text-center text-lg">Loading movies...</p>
        ) : (
          <MoviesCarousel movies={movies} />
        )}
      </div>

      <div className='px-4 py-6 lg:px-24'>
        <p className='lg:text-3xl font-bold text-center p-2 lg:p-5'>Top This Week</p>
        {loading ? (
          <p className="text-center text-lg">Loading top movies...</p>
        ) : (
          <MoviesCarousel movies={movies} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
