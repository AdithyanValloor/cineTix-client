import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import RevenueChart from '../../components/Exhibitor/RevenueChart';

function DashboardPage() {
  const [stats, setStats] = useState({
    totalTheaters: 0,
    upcomingShows: 0,
    todaysBookings: 0,
    weeklyRevenue: 0,
    monthlyRevenue: 0,
    totalRevenue: 0,
    revenueChart: {
      labels: [],
      values: [],
    },
  });

  const fetchDashboardStats = async () => {
    try {
      const res = await axiosInstance.get('/exhibitor/dashboard', { withCredentials: true });

      console.log("Resp : ", res);

      setStats(res.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-2">Welcome, Exhibitor!</h1>
        <p className="text-base-content/70">
          Here’s a quick look at your theater’s performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard title="Total Theaters" value={stats.totalTheaters} />
        <StatCard title="Upcoming Shows" value={stats.upcomingShows} />
        <StatCard title="Today's Bookings" value={stats.todaysBookings} />
        <StatCard title="Revenue This Week" value={`₹${stats.weeklyRevenue}`} />
        <StatCard title="Revenue This Month" value={`₹${stats.monthlyRevenue}`} />
        <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} />
      </div>

      {/* Chart Section */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Analytics Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RevenueChart data={stats.revenueChart} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-base-100 p-4 rounded-xl shadow text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default DashboardPage;
