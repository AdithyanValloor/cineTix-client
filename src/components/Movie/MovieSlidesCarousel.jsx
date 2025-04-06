import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const MoviesCard = ({ id, title, rating, posterUrl }) => {
  return (
    <Link to={`/movie-details/${id}`}>
      <div className="aspect-[4/6] w-full cursor-pointer group">
        <div className="h-5/6 rounded-lg overflow-hidden">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          />
        </div>
        <div className="p-1">
          <p className="flex gap-1 text-[10px] md:text-lg">
            <Star className="size-3 lg:size-6" fill="black" /> {rating}
          </p>
          <p className="text-[10px] md:text-lg">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default function MoviesCarousel() {
  const swiperRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // const response = await axiosInstance.get("/movies");
        const response = await axiosInstance.get("/shows/active-movies");

        console.log("Curently Running movie : ",response);
        

        if (Array.isArray(response.data.data)) {
          setMovies(response.data.data);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateButtons = () => {
    if (swiperRef.current) {
      setShowPrev(!swiperRef.current.isBeginning);
      setShowNext(!swiperRef.current.isEnd);
    }
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", updateButtons);
      updateButtons();
      setSlidesPerView(swiperRef.current.params.slidesPerView);
    }
  }, [movies]);

  const handleNext = () => {
    if (swiperRef.current) {
      const newIndex = swiperRef.current.activeIndex + slidesPerView;
      swiperRef.current.slideTo(newIndex);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      const newIndex = swiperRef.current.activeIndex - slidesPerView;
      swiperRef.current.slideTo(newIndex);
    }
  };

  return (
    <div className="relative w-full">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateButtons();
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
        }}
        slidesPerView={3}
        spaceBetween={8}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <MoviesCard
              id={movie._id}
              title={movie.title}
              rating={movie.rating}
              posterUrl={movie.posters?.[0] || "default-poster.jpg"}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isDesktop && movies.length > slidesPerView && (
        <>
          {showNext && (
            <button
              onClick={handleNext}
              className="absolute top-1/2 -right-5 -translate-y-1/2 bg-base-100 text-base-content p-3 rounded-full shadow-lg z-10 cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {showPrev && (
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -left-5 -translate-y-1/2 bg-base-100 text-base-content p-3 rounded-full shadow-lg z-10 cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
