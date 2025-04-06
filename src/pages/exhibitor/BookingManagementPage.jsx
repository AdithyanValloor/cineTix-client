import React from 'react'

function BookingManagementPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-base-content/70 mt-1">
          All tickets booked for your shows.
        </p>
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
              {/* Sample rows - later you can map real data */}
              <tr>
                <td>1</td>
                <td>Rahul S.</td>
                <td>Leo</td>
                <td>INOX Velachery</td>
                <td>A1, A2, A3</td>
                <td>2025-04-08</td>
                <td>7:30 PM</td>
                <td>₹750</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ananya K.</td>
                <td>Dunki</td>
                <td>PVR Phoenix</td>
                <td>B1, B2</td>
                <td>2025-04-09</td>
                <td>5:00 PM</td>
                <td>₹500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingManagementPage
