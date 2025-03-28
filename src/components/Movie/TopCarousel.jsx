import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const slides = [
  { image: "https://preview.redd.it/empuraan-l2e-official-poster-v0-qtod8xzitfke1.jpeg?auto=webp&s=c3f9aae4960cd164b22bc71ef3df13218140d5d3" },
  { image: "https://static.toiimg.com/thumb/msid-113501216,width-1280,height-720,resizemode-4/113501216.jpg" },
  { image: "https://s3.ap-south-1.amazonaws.com/media.thesouthfirst.com/wp-content/uploads/2025/02/A-poster-of-the-film-Officer-on-Duty.jpg" },
  { image: "https://img.etimg.com/thumb/width-1600,height-900,imgsize-44570,resizemode-75,msid-118252966/magazines/panache/asif-alis-rekhachithram-ott-release-date-out-when-and-where-to-watch-the-highest-grossing-malayalam-film-of-2025.jpg" }
];

export default function ImageCarousel() {
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
              src={slide.image}
              alt={`Slide ${index + 1}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
