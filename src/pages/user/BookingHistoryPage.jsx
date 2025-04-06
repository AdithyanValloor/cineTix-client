import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/booking/all-bookings', {
          withCredentials: true, 
          headers: {
            // Authorization: `Bearer ${yourToken}`, // if using Bearer token
          },
        });
        
        console.log("Bookings response : ",response.data.data);
        

        setBookings(response.data.data); // adapt if your API response is wrapped in data.booking or similar
      } catch (err) {
        console.error(err);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);


  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    if (isNaN(date)) return 'Invalid Date';
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  
  const formatDateOnly = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    if (isNaN(date)) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const formatTimeOnly = (time24) => {
    if (!time24) return 'N/A';
    const [hour, minute] = time24.split(':');
    if (!hour || !minute) return 'Invalid Time';
    const date = new Date();
    date.setHours(+hour);
    date.setMinutes(+minute);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  


  console.log("Booking val : ",bookings);
  

  return (
    <div className="pt-24 pb-10 min-h-screen bg-base-100 md:px-28 text-base-content">
      <h1 className="text-3xl font-bold mb-6">My Booking History</h1>

      {loading ? (
        <p className="text-center mt-10">Loading your bookings...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-16">
          <p className="text-lg font-medium">You haven’t booked any tickets yet.</p>
          <p className="text-base opacity-70 mt-2 mb-4">Explore the latest shows and grab your seat!</p>
          <Link to="/shows" className="btn btn-primary btn-sm">
            Browse Shows
          </Link>
        </div>
      ) : (
  
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-base-200 p-5 rounded-2xl shadow-md border border-base-300">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                  Movie: {booking.movie?.title || "Unknown Movie"}
                </h2>
                <span className="text-xs sm:text-sm md:text-base opacity-70">
                  Booking ID: {booking._id}
                </span>
              </div>
              <p className="text-sm sm:text-base md:text-md">
                <span className="font-medium">Date and Time of Booking:</span>{' '}
                {formatDateTime(booking.createdAt)}
              </p>
              <p className="text-sm sm:text-base md:text-md">
                <span className="font-medium">Theater:</span> {booking.theater?.name} - {booking.theater?.location}
              </p>
              <p className="text-sm sm:text-base md:text-md">
                <span className="font-medium">Date and Time of Show:</span>{' '}
                {formatDateOnly(booking.show?.date)}, {formatTimeOnly(booking.show?.time)}
              </p>
              <p className="text-sm sm:text-base md:text-md">
                <span className="font-medium">Seats type: </span> 
                {[...new Set(booking.seats.map(seat => seat.seatType))].join(", ")}
              </p>
              <p className="text-sm sm:text-base md:text-md">
                <span className="font-medium">Booked seats: </span> 
                {booking.seats.map(seat => `${seat.seat}`).join(", ")}
              </p>
              <p className="text-sm sm:text-base md:text-md">
                <span className="font-medium">Total Price:</span> ₹{booking.totalPrice}
              </p>
              <p className="text-sm sm:text-base md:text-md">
                <span className="font-medium">Payment Status:</span> {booking.paymentStatus}
              </p>
            </div>
          ))}
        </div>


      )}
    </div>
  );
}

export default BookingHistoryPage;
