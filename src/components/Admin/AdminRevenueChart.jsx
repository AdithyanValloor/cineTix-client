import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";


// Registering necessary chart.js elements
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function AdminRevenueChart({ data }) {
  const chartData = {
    labels: data?.labels || [], // e.g., ['January', 'February', 'March']
    datasets: [
      {
        label: "Monthly Revenue (₹)",
        data: data?.values || [], // e.g., [2000, 4500, 3000]
        fill: true,
        borderColor: "rgb(59, 130, 246)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Background color for the line area
        tension: 0.4, // Smooth line
      },
    ],
  };

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">Monthly Revenue</h2>
      <Line data={chartData} />
    </div>
  );
}

export default AdminRevenueChart;
