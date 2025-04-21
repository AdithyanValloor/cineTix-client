import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

function ShowsHistory() {
  const [pastShows, setPastShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 20;

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = pastShows.slice(indexOfFirstShow, indexOfLastShow);

  const totalPages = Math.ceil(pastShows.length / showsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchPastShows = async () => {
    try {
      const exhibitorData = JSON.parse(localStorage.getItem("exhibitor"));
      const res = await axiosInstance.get(`/shows/get-shows?type=past&theater=${exhibitorData.theaterId}`, {
        withCredentials: true,
      });
  
      const sortedShows = res.data.data.sort(
        (a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
      );
  
      setPastShows(sortedShows);
    } catch (err) {
      console.error("Error fetching past shows:", err);
    }
  };
  

  useEffect(() => {
    fetchPastShows();
  }, []);

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Show History</h2>

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
            </tr>
          </thead>
          <tbody>
            {currentShows.length > 0 ? (
              currentShows.map((show, index) => (
                <tr key={show._id}>
                  <td>{indexOfFirstShow + index + 1}</td>
                  <td>{show.movie?.title || "N/A"}</td>
                  <td>{show.theater?.name || "N/A"}</td>
                  <td>{show.screen || "1"}</td>
                  <td>{new Date(show.date).toLocaleDateString()}</td>
                  <td>{show.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-400">
                  No past shows found.
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
  );
}

export default ShowsHistory;
