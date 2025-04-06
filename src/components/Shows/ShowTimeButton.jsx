import React from 'react';

const formatTime12hr = (time24) => {
  if (!time24 || typeof time24 !== "string" || !time24.includes(":")) return "Invalid time";

  const [hourStr, minute] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

const ShowTimeButton = ({ show }) => {
  return (
    <button className="btn bg-white text-black hover:bg-red-500 hover:text-white">
      {formatTime12hr(show.time)}
    </button>
  );
};

export default ShowTimeButton;
