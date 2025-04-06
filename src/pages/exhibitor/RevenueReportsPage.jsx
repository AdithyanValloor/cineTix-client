import React from "react";

function RevenueReportsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-base-200 p-6 rounded-xl shadow">
        <div>
          <h1 className="text-2xl font-bold">Revenue Reports</h1>
          <p className="text-base-content/70">Detailed revenue breakdown for your theaters.</p>
        </div>

        {/* Filter + Export */}
        <div className="flex gap-2 flex-wrap">
          <input
            type="date"
            className="input input-bordered"
            placeholder="Start Date"
          />
          <input
            type="date"
            className="input input-bordered"
            placeholder="End Date"
          />
          <button className="btn btn-primary">Export CSV</button>
          <button className="btn btn-outline">Export PDF</button>
        </div>
      </div>

      {/* Revenue Table */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Revenue Summary</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Theater</th>
                <th>Movie</th>
                <th>Show Time</th>
                <th>Tickets Sold</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {/* Static data for now, later map dynamic data */}
              <tr>
                <td>1</td>
                <td>2025-04-06</td>
                <td>Sunshine Cinema</td>
                <td>Avengers: Endgame</td>
                <td>7:30 PM</td>
                <td>124</td>
                <td>₹24,800</td>
              </tr>
              <tr>
                <td>2</td>
                <td>2025-04-06</td>
                <td>Galaxy Theater</td>
                <td>Pathaan</td>
                <td>5:00 PM</td>
                <td>86</td>
                <td>₹15,480</td>
              </tr>
              <tr>
                <td>3</td>
                <td>2025-04-06</td>
                <td>Cineplex</td>
                <td>Jawan</td>
                <td>8:15 PM</td>
                <td>142</td>
                <td>₹28,400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RevenueReportsPage;
