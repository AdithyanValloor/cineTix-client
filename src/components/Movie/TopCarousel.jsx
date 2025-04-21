import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";



export default function ImageCarousel() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await axiosInstance.get("/carousel");

      setSlides(data.data);
    };
    fetchSlides();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      breakpoints={{
        640: { slidesPerView: 1.2, spaceBetween: 10 },
        1024: { slidesPerView: 1.3, spaceBetween: 20 },
        1280: { slidesPerView: 1.3, spaceBetween: 20 },
      }}
      slidesPerView={1.2}
      spaceBetween={8}
      centeredSlides={true}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      grabCursor={true}
      className="w-full h-[160px] md:h-[350px] lg:h-[500px] transition-all duration-500 ease-in-out"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="w-[80%] lg:w-[60%] relative flex justify-center">
          <div className="bg-gray-800 rounded-lg h-full overflow-hidden shadow-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
