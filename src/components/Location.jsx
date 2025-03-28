import { ChevronDown, MapPin, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const LocationButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex lg:gap-2 text-sm lg:text-lg cursor-pointer items-center lg:border-r lg:px-5 lg:py-2 group"
    >
      <MapPin className="size-4 lg:size-auto" strokeWidth={2} stroke="#e30613" fill="none" />
      <span className="flex items-center">
        Location
        <ChevronDown className="size-3 lg:size-6 lg:stroke-1 transition-transform duration-300 group-hover:rotate-180" />
      </span>
    </button>
  );
};

const LocationBox = ({ showLocation, onClose }) => {
  // Prevent scrolling when the modal is open
  useEffect(() => {
    if (showLocation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount
    };
  }, [showLocation]);

  return (
    <>
      {showLocation && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[5px] z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100 h-full  w-full md:h-[450px] md:w-[600px] lg:w-[900px] shadow-lg p-6 rounded-lg z-50 transition-all duration-300
        ${showLocation ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        onClick={(e) => e.stopPropagation()} // Prevents clicks inside from closing
      >
       <button onClick={onClose} className='absolute right-5 p-2 rounded-full cursor-pointer transition-all duration-500 hover:scale-120 hover:rotate-180'>
            <X className='stroke-2 lg:stroke-1 size-7'/>
        </button>
        <h2 className="text-xl font-bold">Select Location</h2>
      </div>
    </>
  );
};

function LocationComponent() {
  const [showLocationBox, setShowLocationBox] = useState(false);

  const handleLocationBox = () => setShowLocationBox((prev) => !prev);

  return (
    <div>
      <LocationButton onClick={handleLocationBox} />
      <LocationBox showLocation={showLocationBox} onClose={handleLocationBox} />
    </div>
  );
}

export default LocationComponent;
