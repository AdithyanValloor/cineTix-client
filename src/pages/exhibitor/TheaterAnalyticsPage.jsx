import React from 'react';

function TheaterAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-2">Theater Analytics</h1>
        <p className="text-base-content/70">Get insights into performance, bookings, and revenue.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-3xl font-bold mt-2">1,458</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Avg. Occupancy Rate</h2>
          <p className="text-3xl font-bold mt-2">72%</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Monthly Revenue</h2>
          <p className="text-3xl font-bold mt-2">₹1,12,340</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Shows This Month</h2>
          <p className="text-3xl font-bold mt-2">134</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Booking Trends</h2>
        <p className="text-base-content/60">Chart showing bookings over time (coming soon...)</p>
        <div className="h-40 bg-base-100 rounded-lg mt-4 flex items-center justify-center text-sm text-base-content/40">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
}

export default TheaterAnalyticsPage;
