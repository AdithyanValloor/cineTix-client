import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BackButton, ButtonFavourite, ButtonInfo } from '../Button/Button';
import DateSelector from './DateSelector';
import { DropdownFilterLanguage, DropdownFilterPrice, DropdownFilterTime } from './DropDownFilter';
import ShowTimeButton from './ShowTimeButton';
import { axiosInstance } from '../../config/axiosInstance';
import { NavLink } from 'react-router-dom'; 
import dayjs from "dayjs";


function Shows() {
  const { movieId } = useParams();
  // const navigate = useNavigate(); // Initialize useNavigate
  const [movie, setMovie] = useState(null);
  const [theatersWithShows, setTheatersWithShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD")); 

  
  useEffect(() => {
    const fetchMovieAndShows = async () => {
      try {
        const movieRes = await axiosInstance.get(`/movies/${movieId}`);
        setMovie(movieRes.data.data);
  
        // Format date to YYYY-MM-DD
        
        console.log("SElected date : ", selectedDate);
        

        // const formattedDate = selectedDate.toISOString().split('T')[0];

        const formattedDate = selectedDate

        console.log("Formated date : ", formattedDate);
        
  
        const showsRes = await axiosInstance.get(`/shows/movie/${movieId}?date=${formattedDate}`);
        const shows = showsRes.data.data;
  
        const groupedByTheater = shows.reduce((acc, show) => {
          const theaterId = show.theater._id;
          if (!acc[theaterId]) {
            acc[theaterId] = {
              theater: show.theater,
              shows: [],
            };
          }
          acc[theaterId].shows.push(show);
          return acc;
        }, {});
  
        const groupedTheaters = Object.values(groupedByTheater).map(group => {
          const sortedShows = group.shows.sort((a, b) => a.time.localeCompare(b.time));
          return {
            ...group,
            shows: sortedShows,
          };
        });
  
        setTheatersWithShows(groupedTheaters);
  
      } catch (error) {
        console.error("Failed to load movie/shows:", error);
      }
    };
  
    fetchMovieAndShows();
  }, [movieId, selectedDate]); 
  


  if (!movie) return <div className="text-center py-10">Loading movie details...</div>;

  return (
    <div>
      {/* Top movie info section */}
      <div className="bg-base-300 shadow-lg w-full flex flex-col justify-between">
        <div className='px-3 flex shadow-md gap-3 py-3'>
          <BackButton />
          <div className='flex flex-col gap-2'>
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold">{movie.title}</h2>
            <div className='flex gap-2 flex-wrap'>
              <p className='border px-2 text-sm rounded-full'>{movie.certification}</p>
              {Array.isArray(movie.genre) ? (
                movie.genre.map((genre, index) => (
                  <p key={index} className='border px-2 text-sm rounded-full'>{genre}</p>
                ))
              ) : (
                <p className='border px-2 text-sm rounded-full'>{movie.genre}</p>
              )}
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between px-5 py-2'>
          {/* <DateSelector /> */}
          <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

          <div className='flex gap-1'>
            <DropdownFilterLanguage />
            <DropdownFilterPrice />
            <DropdownFilterTime />
          </div>
        </div>
      </div>

      {/* Theater-wise shows */}

      <div className='bg-base-100 w-full flex flex-col py-2 items-center'>
        {theatersWithShows.length === 0 ? (
          <p className="text-gray-500 py-5">No shows available for this movie yet.</p>
        ) : (
          
          theatersWithShows.map((theaterData) => {
            console.log("Theater Data:", theaterData);  // Log the entire theaterData object to confirm structure
            const { theater, shows } = theaterData;  // Destructure to access theater and shows
          
            console.log("Shows Array:", shows);  // Log the shows array itself
            
            return (
              <div
                key={theater._id}  // Use theater._id as the key for the main theater container
                className="bg-base-200 min-h-20 w-[90%] my-2 shadow rounded-lg flex flex-col sm:flex-row sm:items-center justify-between p-7"
              >
                <div className="flex gap-2 items-center">
                  <ButtonFavourite />
                  <p className="text-xl font-bold">{theater.name}</p>
                  <ButtonInfo to={`/theater-details/${theater._id}`}/>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 sm:ml-auto">
                  {/* Check if 'shows' exists and is an array, then map over it */}
                  {shows && Array.isArray(shows) && shows.length > 0 ? (
                    shows[0].shows.map((show) => {
                      console.log("Actual Show Object:", show);  // Now this will have _id
                      return (
                        <NavLink key={show._id} to={`/seat-selection/${show._id}`}>
                          <ShowTimeButton show={show} />
                        </NavLink>
                      );
                    })
                    
                  ) : (
                    <p>No shows available</p>  // In case there are no shows
                  )}
                </div>
              </div>
            );
          })

        )}
      </div>

    </div>
  );
}

export default Shows;
