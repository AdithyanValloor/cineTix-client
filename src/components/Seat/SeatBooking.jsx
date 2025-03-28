import React, { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Seat from "./Seat";
import ThemeToggle from "../ThemeToggle";
import { BackButton, ButtonPrimary } from "../Button/Button";
import ShowTimeButton from "../Shows/ShowTimeButton";
import { useNavigate } from "react-router-dom";

const rows = "ABCDEFGHIJKL".split("").reverse();
const cols = 15;
const sectionOrder = ["Recliner", "VIP", "Premium", "Regular"];
const seatPrices = { Recliner: 500, VIP: 400, Premium: 300, Regular: 200 };

const generateSeats = (availableSections) => {
  let seatLayout = {};
  let rowIndex = 0;

  availableSections.forEach((section) => {
    seatLayout[section] = [];
    const rowsPerSection = Math.floor(rows.length / availableSections.length);
    for (let i = 0; i < rowsPerSection; i++) {
      if (rowIndex >= rows.length) break;
      seatLayout[section].push(
        Array.from({ length: cols }, (_, colIndex) => ({
          _id: `${rows[rowIndex]}${colIndex + 1}`,
          row: rows[rowIndex],
          number: colIndex + 1,
          type: section,
          isBooked: Math.random() < 0.3,
        }))
      );
      rowIndex++;
    }
  });
  return seatLayout;
};

const SeatBooking = ({ screenId, availableSections = sectionOrder }) => {
  const [seats, setSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);
  const transformRef = useRef(null);

  useEffect(() => {
    setSeats(generateSeats(availableSections));

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenId, availableSections]);

  const handleSeatSelect = (seat) => {
    setSelectedSeats((prev) =>
      prev.find((s) => s._id === seat._id)
        ? prev.filter((s) => s._id !== seat._id)
        : [...prev, seat]
    );
    setTotalPrice((prev) =>
      selectedSeats.find((s) => s._id === seat._id)
        ? prev - seatPrices[seat.type]
        : prev + seatPrices[seat.type]
    );
  };

  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
        navigate(-1);
    } else {
        navigate("/");
    }
};

  return (
    <div className="relative flex flex-col items-center w-full h-screen bg-base-200 rounded-lg shadow-lg pb-24">
      {/* Movie Info */}
      <div className="bg-base-300 shadow-lg w-full mb-3 flex flex-col lg:flex-row justify-between items-center p-4">
        
      
        <div className="flex gap-3">
            <BackButton onClick={handleBack}/>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Avengers: Endgame</h2>
              <p className="text-sm sm:text-base md:text-lg py-1 text-base-content">
                  PVR Cinemas, Mall Road, Thursday, Mar 27, 2025, 04:45PM
              </p>
            </div>
        </div>
        <div className="flex">
          <ShowTimeButton/>
          <div className="absolute top-0 right-0 lg:static p-1 lg:p-0">
            <ThemeToggle />
          </div>
        </div>
        
      </div>

      {/* Transform Wrapper */}
      <div className={`relative flex justify-center items-center w-full flex-1 ${isLargeScreen ? 'overflow-auto' : 'overflow-hidden'}`}>
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
                {sectionOrder.map((section) => (
                  <div key={section} className="my-2 text-center w-full">
                    <h3 className="text-md font-semibold">{section} Seats</h3>
                    {seats[section]?.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex justify-center gap-1">
                        {row.map((seat) => (
                          <Seat
                            key={seat._id}
                            seat={seat}
                            onSelect={handleSeatSelect}
                            isSelected={selectedSeats.includes(seat)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
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
          Selected: {selectedSeats.map((s) => `${s.row}${s.number}`).join(", ") || "None"}
        </p>
        {/* <button className="btn bg-red-600 text-white">Pay ₹ {totalPrice}</button> */}
        <ButtonPrimary text={`Pay ₹ ${totalPrice}`}/>
      </div>
    </div>
  );
};

export default SeatBooking;
