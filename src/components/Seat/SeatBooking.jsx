import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Seat from "./Seat";
import ThemeToggle from "../ThemeToggle";
import { BackButton, ButtonPrimary } from "../Button/Button";
import ShowTimeButton from "../Shows/ShowTimeButton";
import CheckoutButton from "../Payment/CheckoutButton";
import { axiosInstance } from "../../config/axiosInstance";

const rows = "ABCDEFGHIJKL".split("").reverse();
const cols = 15;

const sectionOrder = ["Recliner", "VIP", "Premium", "Regular", "Economy"];

const SeatBooking = () => {
  const [seats, setSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);
  const [movieData, setMovieData] = useState(null);
  const [theaterData,setTheaterData ] = useState(null);
  const [showData, setShowData] = useState(null);
  const { showId } = useParams(); // Get showId from URL
  const transformRef = useRef(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        // Fetch seats for the selected show
        const response = await axiosInstance.get(`/shows/${showId}/seats`);

        console.log("/shows response ===", response.data);
        console.log("SHOW ID : ", showId);
        
        
        const availableSeats = response.data.seats;

        // Organize seats by section
        const seatsBySection = availableSeats.reduce((acc, seat) => {
          if (!acc[seat.seatType]) {
            acc[seat.seatType] = [];
          }
          acc[seat.seatType].push(seat);
          return acc;
        }, {});

        setSeats(seatsBySection);

        // Fetch movie details and show details
        const movieRes = await axiosInstance.get(`/shows/movie-data/${showId}`);
        const showRes = await axiosInstance.get(`/shows/show/${showId}`);
        
        console.log("Movie res : ", movieRes.data.data);
        console.log("Show res : ", showRes.data.data);
        
        setShowData(showRes?.data?.data)
        setTheaterData(showRes?.data?.data?.theater)
        setMovieData(movieRes?.data?.data);
      } catch (error) {
        console.error("Error fetching seats or movie details:", error);
      }
    };

    fetchSeats();

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showId]);

  const handleSeatSelect = (seat) => {
    setSelectedSeats((prev) =>
      prev.find((s) => s._id === seat._id)
        ? prev.filter((s) => s._id !== seat._id)
        : [...prev, seat]
    );
    setTotalPrice((prev) =>
      selectedSeats.find((s) => s._id === seat._id)
        ? prev - seat.price
        : prev + seat.price
    );    
  };

  let formattedDate = "";

  if (showData?.date) {
    const isoString = showData.date;
    const date = new Date(isoString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric"
    };
    formattedDate = date.toLocaleDateString("en-US", options);
  }


  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  let formattedTime = ""
  
  if (showData?.time) {
    const time24 = showData.time
    formattedTime = convertTo12HourFormat(time24);
    console.log(formattedTime); // Output: 10:00 AM
  }
  


  if (!movieData) return <div>Loading movie details...</div>;

  return (
    <div className="relative flex flex-col items-center w-full h-screen bg-base-200 rounded-lg shadow-lg pb-24">
      {/* Movie Info */}
      <div className="bg-base-300 shadow-lg w-full mb-3 flex flex-col lg:flex-row justify-between items-center p-4">
        <div className="flex gap-3">
          <BackButton/>
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{movieData.title}</h2>
            <p className="text-sm sm:text-base md:text-lg py-1 text-base-content">
              {theaterData.name}, {theaterData.location} | {formattedDate}, {formattedTime}
            </p>
          </div>
        </div>
        <div className="flex">
          {/* <ShowTimeButton show={movieData}/> */}
          <div className="absolute top-0 right-0 lg:static p-1 lg:p-0">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Transform Wrapper */}
      <div
        className={`relative flex justify-center items-center w-full flex-1 ${isLargeScreen ? 'overflow-auto' : 'overflow-hidden'}`}
      >
        <TransformWrapper
          initialScale={isLargeScreen ? 1 : 0.6}
          minScale={0.5}
          maxScale={isLargeScreen ? 1 : 2.5}
          disabled={isLargeScreen}
          limitToBounds={true}
        >
          {() => (
            <TransformComponent>
              <div className="relative flex flex-col items-center seat-container mb-8 lg:mb-0 p-2 lg:pb-20 lg:pt-52">
    
                {sectionOrder.map((section) => {
                  const sectionSeats = seats[section] || [];
                  if (sectionSeats.length === 0) return null;

                  const seatsByRow = sectionSeats.reduce((acc, seat) => {
                    const rowLabel = seat.seat.match(/[A-Z]+/)[0];
                    if (!acc[rowLabel]) acc[rowLabel] = [];
                    acc[rowLabel].push(seat);
                    return acc;
                  }, {});

                  const sortedRows = Object.keys(seatsByRow).sort((a, b) => rows.indexOf(a) - rows.indexOf(b));

                  return (
                    <div key={section} className="my-2 text-center w-full">
                      <h3 className="text-md font-semibold">{section} Seats</h3>

                      {sortedRows.map((rowLabel, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="flex justify-center items-center gap-2 my-1"
                        >
                          <span className="w-6 text-base-content">{rowLabel}</span>
                          {seatsByRow[rowLabel]
                            .sort((a, b) => {
                              const aCol = parseInt(a.seat.match(/\d+/)[0]);
                              const bCol = parseInt(b.seat.match(/\d+/)[0]);
                              return aCol - bCol; // ← Correct order
                            })                                                      
                            .map((seat) => (
                              <Seat
                                key={seat._id}
                                seat={seat}
                                onSelect={handleSeatSelect}
                                isSelected={selectedSeats.includes(seat)}
                                isBooked={seat.isBooked}
                              />
                            ))}
                        </div>
                      ))}
                    </div>
                  );
                })}



              </div>

              {/* Fixed Screen Indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] bg-white text-black text-center text-sm rounded-lg p-2 shadow-lg">
                SCREEN HERE
              </div>
            </TransformComponent>
          )}
        </TransformWrapper>
      </div>

      {/* Floating Summary Bar */}
      <div className="fixed bottom-0 w-full bg-base-100 shadow-md justify-between p-4 flex items-center ">
        <p className="text-sm font-semibold">
          Selected: {selectedSeats.map((s) => `${s.seat}`).join(", ") || "None"}
        </p>
        {/* <ButtonPrimary text={`Pay ₹ ${totalPrice}`} /> */}

        <CheckoutButton
          showId={showId} // assuming this is the ID you're using for booking
          seats={selectedSeats}
          totalPrice={totalPrice}
        />

      </div>
    </div>
  );
};

export default SeatBooking;
