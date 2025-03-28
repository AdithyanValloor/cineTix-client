import React, {useState} from 'react'

const ShowTimeButton = () => {
    
    const [selectedShowtime, setSelectedShowtime] = useState("10:00 AM");
    
  return (
    <div className="flex gap-2">
        {["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"].map((time) => (
            <button
            key={time}
            className={`btn ${selectedShowtime === time ? "btn bg-red-500 text-white" : "btn bg-white text-black"}`}
            onClick={() => setSelectedShowtime(time)}
            >
            {time}
        </button>
        ))}
    </div>
  )
}

export default ShowTimeButton
