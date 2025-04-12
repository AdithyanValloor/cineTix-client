import React from 'react'
import ImageCarousel from '../../components/Movie/TopCarousel'
import MoviesCarousel from '../../components/Movie/MovieSlidesCarousel'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function HomePage() {

  const { userData } = useSelector((state) => state.user);

  if (!userData) return <Navigate to="/login" />;
  
  if (userData.role === "exhibitor") return <Navigate to="/exhibitor/dashboard" />;
  if (userData.role === "admin") return <Navigate to="/admin/dashboard" />;
  
  return (
    <div className='w-full h-full pt-[150px] md:pt-20 bg-base-300'>
      <ImageCarousel/>
      <div className='px-4 py-6 lg:px-24 '>
        <p className='lg:text-3xl font-bold text-center p-2 lg:p-5'>Recomended movies</p>
        <MoviesCarousel/>
      </div>
      <div className='px-4 py-6 lg:px-24 '>
        <p className='lg:text-3xl font-bold text-center p-2 lg:p-5'>Top this week</p>
        <MoviesCarousel/>
      </div>
    
    </div>
  )
}

export default HomePage
