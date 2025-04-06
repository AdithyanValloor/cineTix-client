import React from 'react'

function MovieSchedulePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Schedule Movies</h1>
        <button className="btn btn-primary">+ Add Show</button>
      </div>

      {/* Upcoming Shows Table */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Upcoming Shows</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Movie</th>
                <th>Theater</th>
                <th>Screen</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample Rows (Replace with dynamic data later) */}
              <tr>
                <td>1</td>
                <td>RRR</td>
                <td>Galaxy Theater</td>
                <td>Screen 2</td>
                <td>2025-04-08</td>
                <td>6:00 PM</td>
                <td>
                  <button className="btn btn-sm btn-outline">Edit</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jailer</td>
                <td>Sunshine Cinema</td>
                <td>Screen 1</td>
                <td>2025-04-08</td>
                <td>9:30 PM</td>
                <td>
                  <button className="btn btn-sm btn-outline">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MovieSchedulePage
