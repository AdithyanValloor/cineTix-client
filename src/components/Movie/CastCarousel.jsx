import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CastCard = ({ name, role, image }) => {
  return (
    <div className="aspect-[4/5] w-full cursor-pointer group">
      <div className='aspect-square rounded-full overflow-hidden'>
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
      </div>
      <div className='p-1 text-center'>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default function CastCarousel({ cast }) {
  const swiperRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isDesktop, setIsDesktop] = useState(true);

  const updateButtons = () => {
    if (swiperRef.current) {
      setShowPrev(!swiperRef.current.isBeginning);
      setShowNext(!swiperRef.current.isEnd);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on('slideChange', updateButtons);
      updateButtons();
      setSlidesPerView(swiperRef.current.params.slidesPerView);
    }
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="relative w-full">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
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
        {cast.map((member, index) => (
          <SwiperSlide key={index}>
            <CastCard name={member.name} role={member.role} image={member.image} />
          </SwiperSlide>
        ))}
      </Swiper>

      {isDesktop && cast.length > slidesPerView && (
        <>
          {showNext && (
            <button 
              onClick={handleNext} 
              className="absolute top-[50%] -right-5 -translate-y-1/2 bg-base-100 text-base-content p-3 rounded-full shadow-lg z-10 cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {showPrev && (
            <button 
              onClick={handlePrev} 
              className="absolute top-[50%] -left-5 -translate-y-1/2 bg-base-100 text-base-content p-3 rounded-full shadow-lg z-10 cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
