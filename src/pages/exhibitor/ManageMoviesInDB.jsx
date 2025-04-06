import React, { useState } from 'react';

function ManageMoviesInDB() {
  const [movies, setMovies] = useState([
    { id: 1, title: 'Jailer', genre: 'Action', duration: '2h 30m' },
    { id: 2, title: 'Leo', genre: 'Thriller', duration: '2h 45m' },
  ]);

  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    duration: '',
  });

  const handleAddMovie = () => {
    if (!newMovie.title || !newMovie.genre || !newMovie.duration) return;

    setMovies([
      ...movies,
      { id: Date.now(), ...newMovie }
    ]);

    setNewMovie({ title: '', genre: '', duration: '' });
  };

  const handleDelete = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Manage Movies</h1>
      </div>

      {/* Add Movie Form */}
      <div className="bg-base-100 p-4 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Add New Movie</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Movie Title"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          />
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Genre"
            value={newMovie.genre}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
          />
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Duration"
            value={newMovie.duration}
            onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
          />
        </div>
        <button onClick={handleAddMovie} className="btn btn-primary mt-2">Add Movie</button>
      </div>

      {/* Movie List */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Movie Database</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <tr key={movie.id}>
                  <td>{index + 1}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.duration}</td>
                  <td>
                    <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDelete(movie.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {movies.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-sm text-gray-400">No movies found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageMoviesInDB;
