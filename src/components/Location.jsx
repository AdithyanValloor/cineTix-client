import { ChevronDown, MapPin, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { useSelector } from 'react-redux';

// Button Component
const LocationButton = ({ onClick, selectedCity }) => {
  return (
    <button
      onClick={onClick}
      className="flex lg:gap-2 text-sm lg:text-lg cursor-pointer items-center lg:border-r lg:px-5 lg:py-2 group"
    >
      <MapPin className="size-4 lg:size-auto" strokeWidth={2} stroke="#e30613" fill="none" />
      <span className="flex items-center capitalize">
        {selectedCity || "Location"}
        <ChevronDown className="size-3 lg:size-6 lg:stroke-1 transition-transform duration-300 group-hover:rotate-180" />
      </span>
    </button>
  );
};

// Modal Box Component
const LocationBox = ({ showLocation, onClose, selectedCity, setSelectedCity, isUserAuth }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axiosInstance.get('/locations');
        
        setCities(res.data.cities);
      } catch (err) {
        console.error('Failed to fetch cities:', err);
      }
    };

    if (showLocation) {
      fetchCities();
    }
  }, [showLocation]);

  useEffect(() => {
    document.body.style.overflow = showLocation ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLocation]);

  const handleCityChange = async (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    localStorage.setItem('selectedCity', newCity); 

    window.dispatchEvent(new Event('cityChanged'));
  
    if (isUserAuth) {
      try {
        await axiosInstance.put('/locations/save-city', { city: newCity }, { withCredentials: true });
      } catch (err) {
        console.error("Error saving city to backend:", err);
      }
    }
  
    onClose(); 
  };
  

  return (
    <>
      {showLocation && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[5px] z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100 h-full w-full md:h-[450px] md:w-[600px] lg:w-[900px] shadow-lg p-6 rounded-lg z-50 transition-all duration-300
        ${showLocation ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 p-2 rounded-full cursor-pointer transition-all duration-500 hover:scale-120 hover:rotate-180"
        >
          <X className="stroke-2 lg:stroke-1 size-7" />
        </button>
        <h2 className="text-xl font-bold mb-6">Select Location</h2>

        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="w-full p-3 border rounded text-lg"
        >
          <option value="">Choose a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

// Wrapper Component
function LocationComponent() {
  const [showLocationBox, setShowLocationBox] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const { isUserAuth, userData } = useSelector((state) => state.user);

  // Load saved city on mount
  useEffect(() => {
    const loadCity = async () => {
      if (isUserAuth) {
        try {
          const res = await axiosInstance.get('/locations/user-city');

          console.log("RES l : ", res);
          
          
          setSelectedCity(res.data.city);
        } catch (err) {
          console.error("Error fetching saved city from backend:", err);
        }
      } else {
        const localCity = localStorage.getItem('selectedCity');
        if (localCity) {
          setSelectedCity(localCity);
        }
      }
    };

    loadCity();
  }, [isUserAuth]);

  const handleLocationBox = () => setShowLocationBox((prev) => !prev);

  return (
    <div>
      <LocationButton onClick={handleLocationBox} selectedCity={selectedCity} />
      <LocationBox
        showLocation={showLocationBox}
        onClose={handleLocationBox}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        isUserAuth={isUserAuth}
      />
    </div>
  );
}

export default LocationComponent;
