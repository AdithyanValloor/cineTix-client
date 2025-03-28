import React, { useState } from "react";
import dayjs from "dayjs"; // Install using `npm i dayjs`

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  // Generate the next 7 days dynamically
  const getNext7Days = () => {
    return Array.from({ length: 7 }, (_, index) =>
      dayjs().add(index, "day").format("YYYY-MM-DD")
    );
  };

  return (
    <div className="text-center">
      <div className="flex gap-1 overflow-x-auto cursor-pointer">
        {getNext7Days().map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`px-3 py-2 rounded-lg cursor-pointer ${
              selectedDate === date
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="block font-semibold">{dayjs(date).format("ddd")}</span>
            <span className="block text-lg">{dayjs(date).format("DD")}</span>
            <span className="block text-xs uppercase">{dayjs(date).format("MMM")}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateSelector;
