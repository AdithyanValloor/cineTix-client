import React from 'react';

function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-2">Welcome, Exhibitor!</h1>
        <p className="text-base-content/70">Here’s a quick look at your theater’s performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Total Theaters</h2>
          <p className="text-3xl font-bold mt-2">4</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Upcoming Shows</h2>
          <p className="text-3xl font-bold mt-2">18</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Today's Bookings</h2>
          <p className="text-3xl font-bold mt-2">236</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Revenue This Week</h2>
          <p className="text-3xl font-bold mt-2">₹72,340</p>
        </div>
      </div>

      {/* Placeholder for Graph/Analytics */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Analytics Overview</h2>
        <p className="text-base-content/60">Analytics charts coming soon...</p>
        {/* Later you can add a Chart.js / Recharts graph here */}
        <div className="h-40 bg-base-100 rounded-lg mt-4 flex items-center justify-center text-sm text-base-content/40">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
