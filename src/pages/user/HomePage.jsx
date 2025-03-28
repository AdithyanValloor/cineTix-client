import React from 'react'
import ImageCarousel from '../../components/Movie/TopCarousel'
import MoviesCarousel from '../../components/Movie/MovieSlidesCarousel'

function HomePage() {
  
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
