import React, { useEffect, useState } from "react";
import Select from "react-select";
import { axiosInstance } from "../../config/axiosInstance";

const FormSelect = ({ options, value, onChange, placeholder }) => (
  <Select
      options={options}
      value={options.find((option) => option.value === value)}
      onChange={(option) => onChange(option?.value || "")}
      placeholder={placeholder}
      menuPortalTarget={document.body}
      menuPosition="fixed"
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
  />
);

function MovieSchedulePage() {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [shows, setShows] = useState([]);

  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [createForm, setCreateForm] = useState({ movie: "", theater: "", date: "", time: "" });
  const [editForm, setEditForm] = useState({ movie: "", theater: "", date: "", time: "" });

  const [editingShowId, setEditingShowId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToDelete, setShowToDelete] = useState(null);

  // Fetch movies, theaters, and shows
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, theatersRes, showsRes] = await Promise.all([
          axiosInstance.get("/movies"),
          axiosInstance.get("/theater/list-theaters", { withCredentials: true }),
          axiosInstance.get("/shows/get-shows?type=upcoming", { withCredentials: true }),
        ]);

        setMovies(moviesRes.data.data.map((m) => ({ label: m.title, value: m._id })));
        setTheaters(theatersRes.data.data.map((t) => ({ label: t.name, value: t._id })));
        setShows(showsRes.data.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCreateChange = (field, value) =>
    setCreateForm((prev) => ({ ...prev, [field]: value }));

  const handleEditChange = (field, value) =>
    setEditForm((prev) => ({ ...prev, [field]: value }));

  const toggleCreateForm = () => {
    setCreateFormVisible((prev) => !prev);
    setMessage(null);
  };

  const refreshShows = async () => {
    const res = await axiosInstance.get("/shows/get-shows?type=upcoming", { withCredentials: true });
    setShows(res.data.data);
  };

  const handleCreateShow = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axiosInstance.post("/shows/create-show", createForm, {
        withCredentials: true,
      });
      setMessage({ text: res.data.message || "Show created", type: "success" });
      await refreshShows();
      setCreateForm({ movie: "", theater: "", date: "", time: "" });
      setCreateFormVisible(false);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Create failed", type: "error" });
    }
    setLoading(false);
  };

  const startEdit = (show) => {
    setEditingShowId(show._id);
    setEditForm({
      movie: show.movie?._id || "",
      theater: show.theater?._id || "",
      date: show.date?.split("T")[0] || "",
      time: show.time || "",
    });
    setMessage(null);
  };

  const cancelEdit = () => {
    setEditingShowId(null);
    setMessage(null);
  };

  const handleUpdateShow = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axiosInstance.put(
        `/shows/update-show/${editingShowId}`,
        editForm,
        { withCredentials: true }
      );
      setMessage({ text: res.data.message || "Show updated", type: "success" });
      await refreshShows();
      cancelEdit();
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Update failed", type: "error" });
    }
    setLoading(false);
  };

  const confirmDeleteShow = (show) => {
    setShowToDelete(show);
    setShowDeleteModal(true);
  };

  const deleteShow = async () => {
    if (!showToDelete) return;

    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/shows/delete-show/${showToDelete._id}`, {
        withCredentials: true,
      });
      setMessage({ text: res.data.message || "Show deleted", type: "success" });
      setShows((prev) => prev.filter((s) => s._id !== showToDelete._id));
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Delete failed", type: "error" });
    }
    setLoading(false);
    setShowDeleteModal(false);
    setShowToDelete(null);
  };

  return (
    <div className="space-y-8">
      {/* Message */}
      {message && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-error"} shadow-lg`}>
          <span>{message.text}</span>
        </div>
      )}

      {/* Create Show */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Schedule New Show</h2>
          <button className="btn btn-outline" onClick={toggleCreateForm}>
            {createFormVisible ? "Close" : "Add Show"}
          </button>
        </div>

        {createFormVisible && (
          <form
            onSubmit={handleCreateShow}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <FormSelect
              options={movies}
              value={createForm.movie}
              onChange={(value) => handleCreateChange("movie", value)}
              placeholder="Select Movie"
            />
            <FormSelect
              options={theaters}
              value={createForm.theater}
              onChange={(value) => handleCreateChange("theater", value)}
              placeholder="Select Theater"
            />
            <input
              type="date"
              className="input input-bordered"
              value={createForm.date}
              onChange={(e) => handleCreateChange("date", e.target.value)}
            />
            <input
              type="time"
              className="input input-bordered"
              value={createForm.time}
              onChange={(e) => handleCreateChange("time", e.target.value)}
            />
            <button type="submit" className="btn btn-primary col-span-full md:col-span-2 lg:col-span-1" disabled={loading}>
              {loading ? "Creating..." : "Create Show"}
            </button>
          </form>
        )}
      </div>

      {/* Show List */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Movie Schedule</h2>
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
              {shows.map((show, i) => (
                <React.Fragment key={show._id}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{show.movie?.title || "N/A"}</td>
                    <td>{show.theater?.name || "N/A"}</td>
                    <td>{show.screen || "1"}</td>
                    <td>{new Date(show.date).toLocaleDateString()}</td>
                    <td>{show.time}</td>
                    <td className="space-x-2">
                      {editingShowId === show._id ? (
                        <>
                          <button className="btn btn-sm btn-success" onClick={handleUpdateShow} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </button>
                          <button className="btn btn-sm btn-error" onClick={cancelEdit}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-outline" onClick={() => startEdit(show)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-error" onClick={() => confirmDeleteShow(show)}>
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                  {editingShowId === show._id && (
                    <tr className="bg-base-200">
                      <td colSpan="7">
                        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                          <FormSelect
                            options={movies}
                            value={editForm.movie}
                            onChange={(value) => handleEditChange("movie", value)}
                            placeholder="Select Movie"
                          />
                          <FormSelect
                            options={theaters}
                            value={editForm.theater}
                            onChange={(value) => handleEditChange("theater", value)}
                            placeholder="Select Theater"
                          />
                          <input
                            type="date"
                            className="input input-bordered"
                            value={editForm.date}
                            onChange={(e) => handleEditChange("date", e.target.value)}
                          />
                          <input
                            type="time"
                            className="input input-bordered"
                            value={editForm.time}
                            onChange={(e) => handleEditChange("time", e.target.value)}
                          />
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-error mb-2">Delete Show?</h3>
            <p className="text-sm mb-4">
              Are you sure you want to delete this show? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button className="btn btn-error" onClick={deleteShow} disabled={loading}>
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button className="btn btn-outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieSchedulePage;
