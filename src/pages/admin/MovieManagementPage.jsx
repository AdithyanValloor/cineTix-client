import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';

function MovieManagementPage() {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    director: '',
    genre: '',
    duration: '',
    releaseDate: '',
    language: '',
    year: '',
    rating: '',
    certification: 'U',
    castAndCrew: [],
    posters: [],
    banners: []
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axiosInstance.get('/movies');

      console.log("RES : ", res.data.data);
      

      setMovies(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch movies');
    }
  };

  const openAddModal = () => {
    setFormMode('add');
    setSelectedMovie(null);
    setFormData({
      title: '',
      description: '',
      director: '',
      genre: '',
      duration: '',
      releaseDate: '',
      language: '',
      year: '',
      rating: '',
      certification: 'U',
      castAndCrew: [],
      posters: [],
      banners: []
    });
    setModalOpen(true);
  };

  const openEditModal = (movie) => {
    setFormMode('edit');
    setSelectedMovie(movie);
    setFormData({
      title: movie.title || '',
      description: movie.description || '',
      director: movie.director || '',
      genre: movie.genre?.join(', ') || '',
      duration: movie.duration || '',
      releaseDate: movie.releaseDate?.slice(0, 10) || '',
      language: movie.language || '',
      year: movie.year || '',
      rating: movie.rating || '',
      certification: movie.certification || 'U',
      castAndCrew: movie.castAndCrew || [],
      posters: [],
      banners: []
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      try {
        await axiosInstance.delete(`/movies/delete/${id}`);
        toast.success('Movie deleted');
        fetchMovies();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'posters' || name === 'banners') {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else if (name === 'genre') {
      setFormData({ ...formData, genre: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCastChange = (index, field, value) => {
    const updated = [...formData.castAndCrew];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, castAndCrew: updated });
  };

  const addCast = () => {
    setFormData({
      ...formData,
      castAndCrew: [...formData.castAndCrew, { name: '', role: '', character: '' }]
    });
  };

  const removeCast = (index) => {
    const updated = formData.castAndCrew.filter((_, i) => i !== index);
    setFormData({ ...formData, castAndCrew: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
  
    for (const key in formData) {
      if (key === 'castAndCrew') {
        formData.castAndCrew.forEach((member, index) => {
          form.append(`castAndCrew[${index}][name]`, member.name);
          form.append(`castAndCrew[${index}][role]`, member.role);
          form.append(`castAndCrew[${index}][character]`, member.character);
          if (member.image) {
            form.append(`castAndCrew[${index}][image]`, member.image);
          }
        });
      } else if (key === 'posters' || key === 'banners') {
        formData[key].forEach((file) => form.append(key, file));
      } else {
        form.append(key, formData[key]);
      }
    }
  
    try {
      if (formMode === 'add') {
        await axiosInstance.post('/movies/add', form);
        toast.success('Movie added');
      } else {
        await axiosInstance.put(`/movies/update/${selectedMovie._id}`, form);
        toast.success('Movie updated');
      }
      setModalOpen(false);
      fetchMovies();
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const [viewModal, setViewModal ] = useState(false)

  const openViewModal = (movie) => {
    setSelectedMovie(movie);
    setViewModal(true); 
  };
  
  const handleRemoveImage = (index, type) => {
    const newImages = [...formData[type]];
    newImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      [type]: newImages,
    }));
  };
  
  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Movie Management</h1>
        <button className="btn btn-primary" onClick={openAddModal}>
          Add Movie
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Release Date</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>
                  <img
                    src={movie.posters?.[0]}
                    alt={movie.title}
                    className="w-16 h-20 object-cover"
                    onClick={() => openViewModal(movie)}
                  />
                </td>
                <td>{movie.title}</td>
                <td>{movie.genre?.join(', ')}</td>
                <td>{movie.releaseDate?.slice(0, 10)}</td>
                <td>{movie.duration} min</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => openEditModal(movie)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(movie._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-3xl overflow-y-auto max-h-[90vh]">
            <h3 className="font-bold text-lg mb-4">
              {formMode === 'add' ? 'Add New Movie' : 'Edit Movie'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="input input-bordered w-full" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="textarea textarea-bordered w-full" />
              <input type="text" name="director" value={formData.director} onChange={handleChange} placeholder="Director" className="input input-bordered w-full" />
              <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre (comma-separated)" className="input input-bordered w-full" />
              <input type="text" name="language" value={formData.language} onChange={handleChange} placeholder="Language" className="input input-bordered w-full" />
              <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Release Year" className="input input-bordered w-full" />
              <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating (1-10)" className="input input-bordered w-full" />
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration in minutes" className="input input-bordered w-full" />
              <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} className="input input-bordered w-full" />

              <select name="certification" value={formData.certification} onChange={handleChange} className="select select-bordered w-full">
                {["U", "U/A", "U-12", "U-16", "A", "PG", "PG-13", "R", "NC-17"].map(cert => (
                  <option key={cert} value={cert}>{cert}</option>
                ))}
              </select>

              {/* Posters */}
              <div>
                <h4 className="font-bold mt-2">Posters</h4>
                <input
                  type="file"
                  name="posters"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  className="file-input file-input-bordered w-full"
                />
                <div className="mt-2 flex gap-2">
                  {formData.posters.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`poster-${index}`}
                        className="w-24 h-32 object-cover"
                      />
                      <button
                        className="absolute top-0 right-0 text-white bg-black bg-opacity-50 p-1 rounded-full"
                        onClick={() => handleRemoveImage(index, "posters")}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1">Banners</label>
                <input type="file" name="banners" multiple accept="image/*" onChange={handleChange} className="file-input w-full" />
              </div>

              <div>
                <label className="font-semibold">Cast & Crew</label>
                {formData.castAndCrew.map((cast, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 mb-2 items-center">
                    <input
                      type="text"
                      value={cast.name}
                      onChange={(e) => handleCastChange(index, 'name', e.target.value)}
                      placeholder="Name"
                      className="input input-bordered"
                    />
                    <input
                      type="text"
                      value={cast.role}
                      onChange={(e) => handleCastChange(index, 'role', e.target.value)}
                      placeholder="Role"
                      className="input input-bordered"
                    />
                    <input
                      type="text"
                      value={cast.character}
                      onChange={(e) => handleCastChange(index, 'character', e.target.value)}
                      placeholder="Character"
                      className="input input-bordered"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleCastChange(index, 'image', e.target.files[0])}
                      className="file-input"
                    />
                    <button
                      type="button"
                      onClick={() => removeCast(index)}
                      className="btn btn-sm btn-error col-span-4"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCast}
                  className="btn btn-sm btn-outline mt-2"
                >
                  Add Cast
                </button>
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{formMode === 'add' ? 'Add Movie' : 'Update Movie'}</button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      
      {viewModal && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-3xl overflow-y-auto max-h-[90vh]">
            <div className='flex gap-2 mb-2'>
              <div>
                <img src={selectedMovie.posters} alt="" />
              </div>
              <div>
                <img src={selectedMovie.banners} alt="" />
              </div>
            </div>
            <h3 className="font-bold text-2xl mb-4">{selectedMovie?.title}</h3>
            <p>{selectedMovie?.description}</p>
            <p><strong>Director:</strong> {selectedMovie?.director}</p>
            <p><strong>Genre:</strong> {selectedMovie?.genre?.join(", ")}</p>
            <p><strong>Release Date:</strong> {selectedMovie?.releaseDate}</p>
            <p><strong>Duration:</strong> {selectedMovie?.duration} min</p>
            {/* More fields can be added here */}
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setViewModal(false)}
            >
              Close
            </button>
          </div>
        </dialog>
      )}


    </div>
  );
}

export default MovieManagementPage;
