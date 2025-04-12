import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

function TheaterManagementPage() {
  const seatTypes = [
    "Economy", "Regular", "Premium", "Executive",
    "Recliner", "VIP", "Couple", "Box", "Wheelchair",
  ];

  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTheaterId, setEditTheaterId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);

  const emptyForm = {
    name: '',
    location: '',
    rows: '',
    columns: '',
    sections: [
      { sectionName: 'Section A', seatType: '', price: '', rows: '' },
      { sectionName: 'Section B', seatType: '', price: '', rows: '' },
    ],
  };

  const [form, setForm] = useState(emptyForm);

  const updateSection = (index, updatedSection) => {
    const updatedSections = [...form.sections];
    updatedSections[index] = updatedSection;
    setForm({ ...form, sections: updatedSections });
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        { sectionName: '', seatType: '', price: '', rows: '' },
      ],
    });
  };

  const removeSection = (index) => {
    const updated = [...form.sections];
    updated.splice(index, 1);
    setForm({ ...form, sections: updated });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditTheaterId(null);
    setIsAddingNew(false);
  };

  const fetchTheaters = async () => {
    try {
      const res = await axiosInstance.get('/theater/list-theaters', {
        withCredentials: true,
      });
      setTheaters(res.data.data);
    } catch (err) {
      console.error('Error fetching theaters:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  const handleEditClick = (theater) => {
    if (editTheaterId === theater._id) {
      resetForm();
    } else {
      const prefilledForm = {
        name: theater.name,
        location: theater.location,
        rows: theater.rows,
        columns: theater.columns,
        sections: theater.sections.map((section) => ({
          sectionName: section.sectionName || '',
          seatType: section.seatType || '',
          price: section.price || '',
          rows: section.rows?.join(',') || '',
        })),
      };
      setForm(prefilledForm);
      setEditTheaterId(theater._id);
      setIsAddingNew(false);
    }
  };

  const handleDeleteClick = (theaterId) => {
    setSelectedTheaterId(theaterId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/theater/delete-theater/${selectedTheaterId}`, {
        withCredentials: true,
      });
      console.log(res.data.message);
      fetchTheaters();
    } catch (err) {
      console.error('Error deleting theater:', err.response?.data || err.message);
    } finally {
      setShowConfirmModal(false);
      setSelectedTheaterId(null);
    }
  };

  const handleUpdateTheater = async () => {
    try {
      const payload = {
        ...form,
        rows: Number(form.rows),
        columns: Number(form.columns),
        sections: form.sections.map((section) => ({
          ...section,
          price: Number(section.price),
          rows: section.rows.split(',').map((r) => r.trim().toUpperCase()),
        })),
      };

      const res = await axiosInstance.patch(`/theater/edit-theater/${editTheaterId}`, payload, {
        withCredentials: true,
      });

      console.log('Updated:', res.data);
      resetForm();
      fetchTheaters();
    } catch (err) {
      console.error('Error updating theater:', err.response?.data || err.message);
    }
  };

  const handleAddTheater = async () => {
    try {
      const payload = {
        ...form,
        rows: Number(form.rows),
        columns: Number(form.columns),
        sections: form.sections.map((section) => ({
          ...section,
          price: Number(section.price),
          rows: section.rows.split(',').map((r) => r.trim().toUpperCase()),
        })),
      };

      const res = await axiosInstance.post('/theater/add-theater', payload, {
        withCredentials: true,
      });

      console.log('Added:', res.data);
      resetForm();
      fetchTheaters();
    } catch (err) {
      console.error('Error adding theater:', err.response?.data || err.message);
    }
  };

  const renderForm = (onSubmit, isEdit = false) => (
    <div className="mt-4 space-y-4 bg-base-100 p-4 rounded-lg">
      <input
        className="input input-bordered w-full"
        placeholder="Theater Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="input input-bordered w-full"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <input
        type="number"
        className="input input-bordered w-full"
        placeholder="Rows"
        value={form.rows}
        onChange={(e) => setForm({ ...form, rows: e.target.value })}
      />
      <input
        type="number"
        className="input input-bordered w-full"
        placeholder="Columns"
        value={form.columns}
        onChange={(e) => setForm({ ...form, columns: e.target.value })}
      />

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-700">Sections</h3>
        {form.sections.map((section, idx) => (
          <div key={idx} className="border p-3 rounded-md space-y-2 bg-gray-50">
            <select
              className="select select-sm select-bordered w-full"
              value={section.seatType}
              onChange={(e) => {
                const seatType = e.target.value;
                updateSection(idx, { ...section, seatType, sectionName: seatType });
              }}
            >
              <option value="" disabled>Select Seat Type</option>
              {seatTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <input
              type="number"
              className="input input-sm input-bordered w-full"
              placeholder="Price"
              value={section.price}
              onChange={(e) => updateSection(idx, { ...section, price: e.target.value })}
            />

            <input
              className="input input-sm input-bordered w-full"
              placeholder="Rows (comma separated: A,B,C)"
              value={section.rows}
              onChange={(e) => updateSection(idx, { ...section, rows: e.target.value })}
            />

            <button onClick={() => removeSection(idx)} className="btn btn-xs btn-error">
              Remove
            </button>
          </div>
        ))}

        <button onClick={addSection} className="btn btn-sm btn-outline btn-accent w-full">
          + Add Section
        </button>
      </div>

      <button onClick={onSubmit} className="btn btn-primary w-full">
        {isEdit ? 'Save Changes' : 'Add Theater'}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Theaters</h2>
          <button
            className={`btn btn-sm ${isAddingNew ? 'btn-error' : 'btn-success'}`}
            onClick={() => {
              if (isAddingNew) {
                resetForm();
              } else {
                setForm(emptyForm);
                setIsAddingNew(true);
                setEditTheaterId(null);
              }
            }}
          >
            {isAddingNew ? 'Close' : '+ Add Theater'}
          </button>
        </div>

        {isAddingNew && renderForm(handleAddTheater)}

        {loading ? (
          <p className="text-gray-500">Loading theaters...</p>
        ) : theaters.length === 0 ? (
          <p className="text-gray-500">No theaters found.</p>
        ) : (
          <div className="overflow-x-auto space-y-4">
            {theaters.map((theater) => (
              <div key={theater._id} className="shadow rounded-md p-4 space-y-2 bg-base-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">{theater.name}</p>
                    <p className="text-sm text-gray-500">{theater.location}</p>
                    <p className="text-sm text-gray-400 italic">
                      Sections: {theater.sections?.length || 'N/A'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`btn btn-sm ${editTheaterId === theater._id ? 'btn-error' : 'btn-outline'}`}
                      onClick={() => handleEditClick(theater)}
                    >
                      {editTheaterId === theater._id ? 'Close' : 'Edit'}
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteClick(theater._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {editTheaterId === theater._id && renderForm(handleUpdateTheater, true)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this theater?"
      />
    </div>
  );
}

const ConfirmModal = ({ open, onClose, onConfirm, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md space-y-4 max-w-sm w-full">
        <p className="text-gray-800">{message}</p>
        <div className="flex justify-end space-x-2">
          <button className="btn btn-sm btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-sm btn-error" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TheaterManagementPage;
