import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { axiosInstance } from "../../config/axiosInstance";

function ManageCarousel() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState("");
  const [editImage, setEditImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axiosInstance.get("/carousel");

    console.log("RES : ", res);
    
    setImages(res.data.data);
  };

  const handleUpload = async () => {
    if (!newImage) return;
    const formData = new FormData();
    formData.append("image", newImage);
    if (caption) formData.append("caption", caption);

    await axiosInstance.post("/carousel", formData);
    setNewImage(null);
    setCaption("");
    fetchImages();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    await axiosInstance.delete(`/carousel/${id}`);
    fetchImages();
  };

  const handleEdit = (img) => {
    setEditingId(img._id);
    setEditCaption(img.caption || "");
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    if (editCaption) formData.append("caption", editCaption);
    if (editImage) formData.append("image", editImage);

    await axiosInstance.put(`/carousel/${editingId}`, formData);
    setEditingId(null);
    setEditImage(null);
    setEditCaption("");
    fetchImages();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Carousel</h2>

      {/* Upload Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-base-200 p-4 rounded-lg shadow mb-6">
        <input
          type="file"
          onChange={(e) => setNewImage(e.target.files[0])}
          className="file-input file-input-bordered"
        />
        <input
          type="text"
          placeholder="Optional caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="input input-bordered"
        />
        <button className="btn btn-primary" onClick={handleUpload}>
          Upload
        </button>
      </div>

      {/* Carousel Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img._id} className="card bg-base-100 shadow-md">
            <figure className="h-48 overflow-hidden">
              <img
                src={img.imageUrl}
                alt={img.caption}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body p-4">
              {editingId === img._id ? (
                <>
                  <input
                    type="text"
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="input input-sm input-bordered w-full mb-2"
                  />
                  <input
                    type="file"
                    onChange={(e) => setEditImage(e.target.files[0])}
                    className="file-input file-input-sm file-input-bordered w-full mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-success btn-sm" onClick={handleUpdate}>
                      <FaSave /> Save
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600">{img.caption || "No caption"}</p>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEdit(img)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(img._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageCarousel;
