import React from 'react'
import MoviesCarousel from '../../components/Movie/MovieSlidesCarousel'

function AllMoviesPage() {
  return (
    <div className='pt-20 bg-red-100'>
      <div className="px-5 bg-base-200 md:px-50 py-6">
              <h2 className="font-bold text-lg sm:text-2xl md:text-3xl py-2"></h2>
              <MoviesCarousel />
            </div>
    </div>
  )
}

export default AllMoviesPage
