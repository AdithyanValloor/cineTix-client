import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import AdminRevenueChart from "../../components/Admin/AdminRevenueChart";


function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalExhibitors: 0,
    totalTheaters: 0,
    totalMovies: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    revenueChart: {
      labels: [],
      values: [],
    },
  });

  const fetchAdminStats = async () => {
    try {
      const res = await axiosInstance.get("/admin/dashboard", { withCredentials: true });
      

      setStats(res.data);
    } catch (error) {
      console.error("Error fetching admin dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-2">Welcome, Admin!</h1>
        <p className="text-base-content/70">
          Here’s a summary of overall platform performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Exhibitors" value={stats.totalExhibitors} />
        <StatCard title="Total Theaters" value={stats.totalTheaters} />
        <StatCard title="Total Movies" value={stats.totalMovies} />
        <StatCard title="Total Bookings" value={stats.totalBookings} />
        <StatCard title="Monthly Revenue" value={`₹${stats.monthlyRevenue}`} />
      </div>

      {/* Revenue Chart Section */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Analytics Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AdminRevenueChart data={stats.revenueChart} />
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

export default AdminDashboardPage;
