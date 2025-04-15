import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import WarningModal from '../../components/Admin/WarningModal';

function AdminTheaterManagement() {
  const [theaters, setTheaters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

  const theatersPerPage = 10;
  const indexOfLast = currentPage * theatersPerPage;
  const indexOfFirst = indexOfLast - theatersPerPage;
  const currentTheaters = theaters.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(theaters.length / theatersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchTheaters = async () => {
    try {
      const res = await axiosInstance.get('/theater/all-theaters', { withCredentials: true });
      setTheaters(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch theaters:', err);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert({ message: '', type: '', visible: false });
    }, 3000);
  };

  const handleDeactivate = async (id) => {
    try {
      await axiosInstance.put(`/theater/deactivate/${id}`, {}, { withCredentials: true });
      setTheaters(prev => prev.map(t => t._id === id ? { ...t, isActive: false } : t));
      showAlert('Theater deactivated!', 'info');
    } catch (err) {
      console.error('Deactivate error:', err);
    }
  };

  const handleReactivate = async (id) => {
    try {
      await axiosInstance.put(`/theater/reactivate/${id}`, {}, { withCredentials: true });
      setTheaters(prev => prev.map(t => t._id === id ? { ...t, isActive: true } : t));
      showAlert('Theater reactivated!', 'success');
    } catch (err) {
      console.error('Reactivate error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/theater/delete/${id}`, { withCredentials: true });
      const updated = theaters.filter(t => t._id !== id);
      setTheaters(updated);

      const newTotalPages = Math.ceil(updated.length / theatersPerPage);
      if (currentPage > newTotalPages && newTotalPages !== 0) {
        setCurrentPage(newTotalPages);
      }

      showAlert('Theater deleted!', 'error');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const [selectedTheaterId, setSelectedTheaterId] = useState(null);
  const [action, setAction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (id, type) => {
    setSelectedTheaterId(id);
    setAction(type);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (!selectedTheaterId) return;
    switch (action) {
      case 'deactivate':
        handleDeactivate(selectedTheaterId);
        break;
      case 'reactivate':
        handleReactivate(selectedTheaterId);
        break;
      case 'delete':
        handleDelete(selectedTheaterId);
        break;
      default:
        break;
    }
    setShowModal(false);
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  // Adjust currentPage if out of bounds after update
  useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="space-y-6">
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Theater Management</h1>
        <p className="text-base-content/70 mt-1">Manage all theaters in the platform.</p>
      </div>

      {alert.visible && (
        <div className={`fixed top-20 right-10 w-80 p-4 rounded-md shadow-md z-50 ${alert.type === 'error' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}>
          <div className="flex items-center">
            <span className="text-white">{alert.message}</span>
          </div>
        </div>
      )}

      <div className="bg-base-100 p-4 rounded-xl shadow">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Location</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTheaters.length > 0 ? (
                currentTheaters.map((theater, index) => (
                  <tr key={theater._id}>
                    <td>{indexOfFirst + index + 1}</td>
                    <td>{theater.name}</td>
                    <td>{theater.location}</td>
                    <td>{`${theater.exhibitor?.firstName || ''} ${theater.exhibitor?.lastName || ''}`.trim() || 'N/A'}</td>
                    <td>
                      {theater.isActive ? (
                        <span className="text-green-500">Active</span>
                      ) : (
                        <span className="text-gray-500">Inactive</span>
                      )}
                    </td>
                    <td className="flex flex-wrap gap-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() =>
                          theater.isActive
                            ? openModal(theater._id, 'deactivate')
                            : openModal(theater._id, 'reactivate')
                        }
                      >
                        {theater.isActive ? 'Deactivate' : 'Reactivate'}
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => openModal(theater._id, 'delete')}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No theaters found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
       )}

        {showModal && (
        <WarningModal
          onConfirm={handleConfirm}
          onClose={() => setShowModal(false)}
          action={action}
          type={'theater'}
        />
         )}
      </div>
    </div>
  );
}

export default AdminTheaterManagement;
