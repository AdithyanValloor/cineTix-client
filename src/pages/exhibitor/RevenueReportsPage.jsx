import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
function RevenueReportsPage() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosInstance.get("/exhibitor/revenue-reports", { withCredentials: true });
        setReportData(res.data);
      } catch (err) {
        console.error("Failed to fetch revenue reports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

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
          <input type="date" className="input input-bordered" />
          <input type="date" className="input input-bordered" />
          <button className="btn btn-primary">Export CSV</button>
          <button className="btn btn-outline">Export PDF</button>
        </div>
      </div>

      {/* Revenue Table */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Revenue Summary</h2>

        {loading ? (
          <p>Loading revenue data...</p>
        ) : (
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
                {reportData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.theater}</td>
                    <td>{item.movie}</td>
                    <td>{item.time}</td>
                    <td>{item.tickets}</td>
                    <td>₹{item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default RevenueReportsPage;
