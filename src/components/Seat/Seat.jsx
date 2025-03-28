import React from "react";

const Seat = ({ seat, onSelect, isSelected }) => {
  return (
    <button
      className={`btn w-5 h-5 p-4 m-0.5 rounded-sm text-[13px] transition
        ${seat.isBooked ? "bg-gray-400 cursor-not-allowed" : ""}
        ${seat.type === "Regular" ? "border-2 border-green-400 hover:bg-green-400" : ""}
        ${seat.type === "Premium" ? "border-2 border-yellow-400 hover:bg-yellow-400" : ""}
        ${seat.type === "Recliner" ? "border-2 border-red-400 hover:bg-red-400" : ""}
        ${seat.type === "VIP" ? "border-2 border-purple-400 hover:bg-purple-400" : ""}
        ${isSelected ? "bg-blue-400 text-white" : ""}
      `}
      onClick={() => !seat.isBooked && onSelect(seat)}
      disabled={seat.isBooked}
    >
      {seat.row}
      {seat.number}
    </button>
  );
};

export default Seat;
