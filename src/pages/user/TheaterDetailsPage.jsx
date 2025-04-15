import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import MoviesCarousel from '../../components/Movie/MovieSlidesCarousel';

function TheaterDetailsPage() {
  const { id } = useParams();
  const [theater, setTheater] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchTheaterDetails = async () => {
      try {

        const res = await axiosInstance.get(`/theater/${id}`);
    
        setTheater(res.data.theater);
      } catch (err) {
        console.error('Error fetching theater details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaterDetails();
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axiosInstance.get(`/shows/movies-by-theater/${id}`);
        
        console.log("RES : ", res.data.data);
        

        setMovies(res.data.data); 
      } catch (err) {
        console.error('Error fetching movies by theater:', err);
      } finally {
        setMoviesLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  if (loading) return <div className="pt-20 px-6">Loading theater details...</div>;
  if (!theater) return <div className="pt-20 px-6">Theater not found</div>;

  return (
    <div className="min-h-screen pt-34 md:pt-24 px-4 md:px-20 bg-base-200">
      <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-2">{theater.name}</h1>
            <p className="text-gray-600 mb-4">{theater.location}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
                <h2 className="text-xl font-semibold mb-2">Theater Info</h2>
                <ul className="text-sm text-gray-700">
                <li><strong>Rows:</strong> {theater.rows}</li>
                <li><strong>Columns:</strong> {theater.columns}</li>
                <li><strong>Active:</strong> {theater.isActive ? "Yes" : "No"}</li>
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Exhibitor Info</h2>
                <div className="flex items-center gap-4">
                <img
                    src={theater.exhibitor?.profilePicture?.url}
                    alt="Exhibitor"
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold">
                    {theater.exhibitor?.firstName} {theater.exhibitor?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{theater.exhibitor?.email}</p>
                </div>
                </div>
            </div>
            </div>

            <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Sections</h2>
            {theater.sections.length === 0 ? (
                <p className="text-gray-500">No sections defined.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {theater.sections.map((section, index) => (
                    <div key={index} className="p-4 bg-base-300 rounded shadow">
                    <h3 className="font-bold text-base">{section.name}</h3>
                    <p className="text-sm">{section.seatType}</p>
                    <p className="text-sm">Price: ₹{section.price}</p>
                    </div>
                ))}
                </div>
            )}
            </div>
      </div>
      <div className='py-20'>
      <h1 className="text-3xl font-bold mb-10">Upcoming shows in {theater.name}</h1>
        <MoviesCarousel movies={movies}/>
      </div>
    </div>
  );
}

export default TheaterDetailsPage;
