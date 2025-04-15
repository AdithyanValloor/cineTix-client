import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

function BookingManagementPage() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get('/exhibitor/bookings', { withCredentials: true });
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-base-content/70 mt-1">All tickets booked for your shows.</p>
      </div>

      {/* Bookings Table */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Movie</th>
                <th>Theater</th>
                <th>Seats</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{indexOfFirstBooking + index + 1}</td>
                    <td>{booking.user?.firstName} {booking.user?.lastName}</td>
                    <td>{booking.show?.movie?.title}</td>
                    <td>{booking.show?.theater?.name}</td>
                    <td>
                      <div className="flex flex-col">
                        {Array.from({ length: Math.ceil(booking.seats.length / 7) }, (_, rowIndex) => {
                          const start = rowIndex * 7;
                          const rowSeats = booking.seats.slice(start, start + 7);
                          return (
                            <span key={rowIndex}>
                              {rowSeats.map((seat, i) => seat.seat).join(', ')}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td>{new Date(booking.show?.date).toLocaleDateString()}</td>
                    <td>{booking.show?.time}</td>
                    <td>₹{booking.seats.reduce((total, seat) => total + seat.price, 0)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-base-content/70">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingManagementPage;
