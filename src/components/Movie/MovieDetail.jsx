import { useEffect, useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import MoviesCarousel from "../../components/Movie/MovieSlidesCarousel";
import CastCarousel from "../../components/Movie/CastCarousel";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useParams } from "react-router-dom";

const MovieBanner = ({ movie }) => {
  if (!movie) return null;

  return (
    <div
      className="relative w-full py-10 px-1 md:px-10 flex gap-2 md:gap-5 lg:px-50 mx-auto bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${movie.banners[0]}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      <div className="relative flex gap-2 md:gap-5 w-full">
        <div className="w-[40%] min-w-[100px] max-w-[180px] md:max-w-[220px] flex-shrink-0">
          <img className="w-full h-auto rounded-lg shadow-lg" src={movie.posters[1] || movie.posters} alt={movie.title} />
        </div>

        <div className="flex flex-col gap-1 justify-end md:gap-4 text-white z-10">
          <h1 className="text-2xl sm:text-xl md:text-4xl font-bold">{movie.title}</h1>

          <Link to={"/user/reviews"}>
            <div className="w-fit self-start inline-flex rounded-lg flex-wrap gap-2 text-xs sm:text-sm md:text-base bg-neutral-900 p-2 cursor-pointer">
              <p className="text-white rounded-md inline-flex items-center gap-1 md:gap-2">
                <Star className="size-3 md:size-5" fill="white" /> {movie.rating} ({movie.votes} votes){" "}
                <ChevronRight className="size-3" />
              </p>
              <button className="bg-red-200 px-2 text-black sm:px-2 py-1 rounded-md inline-flex cursor-pointer hover:scale-105 transition-all duration-200">
                Rate Now
              </button>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm md:text-base text-white">
            <p className="px-2 sm:px-3 py-1 rounded-md inline-flex">{Math.floor(movie.duration / 60)}h {movie.duration % 60 !== 0 && ` ${movie.duration % 60}m`}</p>
            <span className="text-white">•</span>
            <p className="px-2 sm:px-3 py-1 rounded-md inline-flex">{movie.genre}</p>
            <span className="text-white">•</span>
            <p className="px-2 sm:px-3 py-1 rounded-md inline-flex">{movie.certification}</p>
          </div>
          
          <div className="inline-block">
            <Link  className="bg-red-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-red-500 transition-all duration-300 mt-2 sm:mt-3 inline-flex self-start hover:scale-105 cursor-pointer" to={`/shows/${movie._id}`}>
              <button>
                Book Tickets
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const MovieInfo = ({ title, children }) => (
  <div className="px-5 bg-base-200 md:px-50 py-6">
    <div className="max-w-3xl">
      <h2 className="font-bold text-lg sm:text-2xl md:text-3xl py-2">{title}</h2>
      <p className="text-base-content text-xs sm:text-sm md:text-base leading-relaxed">{children}</p>
    </div>
  </div>
);

function MovieDetails() {

  const {id} = useParams()
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchMovieData() {
    
      try {

        const response = await axiosInstance.get(`/movies/${id}`);
        
        console.log("Movies Data:", response.data.data); 
  
        setMovie(response.data.data); 
        
      } catch (error) {
        console.error("Error fetching movies:", error);
      }

      console.log("movie:", movie);
            

      setMovie(movieData);
      setCast(castData);
    }

    fetchMovieData();

    window.scrollTo({ top: 0, behavior: "instant" });

  }, [id]);

  if (!movie) return <div className="text-center py-10">Loading...</div>;

  console.log("MOVIE : ", movie.castAndCrew);

  movie.castAndCrew.map((item) => {
    console.log(item);
    
  })
  

  return (
    <div className="pt-[140px] md:pt-20">
      <MovieBanner movie={movie} />
      <MovieInfo title="About the Movie">{movie.description}</MovieInfo>

      <div className="px-5 bg-base-200 md:px-50 py-6">
        <h2 className="font-bold text-lg sm:text-2xl md:text-3xl py-2">Cast & Crew</h2>
        {/* <CastCarousel cast={cast} /> */}
        { movie.castAndCrew.map((item) => {
          console.log(item);
          return(
            <div className="flex gap-2 my-2">
              <p className="font-semibold">{item.name} :</p>
              <p className="font-extralight">{item.character && item.character !== 'N/A' ? item.character : item.role}</p>
            </div>
          )
        })}

      </div>

      <div className="px-5 bg-base-200 md:px-50 py-6">
        <h2 className="font-bold text-lg sm:text-2xl md:text-3xl py-2">You may also like</h2>
        <MoviesCarousel />
      </div>
    </div>
  );
}

export default MovieDetails;
