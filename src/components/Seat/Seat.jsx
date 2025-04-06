import React from "react";

const Seat = ({ key, seat, onSelect, isSelected, isBooked }) => {
  return (

    <button
      className={`btn w-6 h-6 p-0 m-0.5  text-[10px] transition
        ${isBooked ? "bg-gray-400 cursor-not-allowed" : ""}
        ${seat.seatType === "Economy" ? "border-2 border-green-400 hover:bg-green-400" : ""}
        ${seat.seatType === "Regular" ? "border-2  border-gray-300 hover:bg-gray-400" : ""}
        ${seat.seatType === "Premium" ? "border-2 border-yellow-400 hover:bg-yellow-400" : ""}
        ${seat.seatType === "Recliner" ? "border-2 border-red-400 hover:bg-red-400" : ""}
        ${seat.seatType === "VIP" ? "border-2 border-purple-400 hover:bg-purple-400" : ""}
        ${isSelected ? "bg-blue-400 text-white" : ""}
      `}
      onClick={() => !isBooked && onSelect(seat)}
      disabled={isBooked}
    >
      {seat.seat}
    </button>



  );
};


export default Seat;
