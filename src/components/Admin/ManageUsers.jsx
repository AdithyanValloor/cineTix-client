import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import WarningModal from './WarningModal';
import { ManageUsersBTN } from './ManageUsersBTN';


function ManageUsers({userRole}) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users.filter((user) => user.role === userRole );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/admin/users', { withCredentials: true });
      console.log("USER : ", res.data.data);
      setUsers(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert({ message: '', type: '', visible: false });
    }, 3000); 
  };

  const handlePermanentBan = async (userId) => {
    try {
      await axiosInstance.put(`/admin/ban-user/${userId}`, {}, { withCredentials: true }, { banType: 'permanent' });
      setUsers(prev =>
        prev.map(user =>
          user._id === userId
            ? { ...user, isBanned: true, banType: 'permanent', isActive: false, banExpiry: null }
            : user
        )
      );
      showAlert('User permanently banned!', 'warning');
    } catch (err) {
      console.error('Failed to permanently ban user:', err);
    }
  };

  const handleTemporaryBan = async (userId, duration) => {
    try {
      if (!duration || isNaN(duration) || parseInt(duration) <= 0) {
        showAlert('Please enter a valid duration!', 'error');
        return;
      }
  
      const res = await axiosInstance.put(
        `/admin/ban-user/${userId}`,
        { banType: 'temporary', durationInDays: parseInt(duration) },
        { withCredentials: true }
      );
  
      const updatedUser = res?.data?.updatedUser;
      if (!updatedUser) {
        showAlert('Ban applied, but failed to get updated user info.', 'error');
        return;
      }
  
      setUsers(prev =>
        prev.map(user =>
          user._id === userId
            ? { ...user, isBanned: true, banType: 'temporary', isActive: false, banExpiry: updatedUser.banExpiry }
            : user
        )
      );
      showAlert(`User banned for ${duration} days!`, 'warning');
    } catch (err) {
      console.error('Failed to temporarily ban user:', err);
    }
  };
  

  const handleDeactivateUser = async (userId) => {
    try {
      await axiosInstance.put(`/admin/deactivate-user/${userId}`, {}, { withCredentials: true });
      setUsers(prev =>
        prev.map(user =>
          user._id === userId ? { ...user, isActive: false } : user
        )
      );
      showAlert('User deactivated successfully!', 'info');
    } catch (err) {
      console.error('Failed to deactivate user:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/delete-user/${userId}`, { withCredentials: true });
      setUsers(prev => prev.filter(user => user._id !== userId));
      showAlert('User deleted successfully!', 'error');
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      await axiosInstance.put(`/admin/unban-user/${userId}`, {}, { withCredentials: true });
      setUsers(prev =>
        prev.map(user =>
          user._id === userId
            ? { ...user, isBanned: false, banType: null, banExpiry: null, isActive: true }
            : user
        )
      );
      showAlert('User unbanned successfully!', 'info');
    } catch (err) {
      console.error('Failed to unban user:', err);
    }
  };

  const handleReactivate = async (userId) => {
    try {
      await axiosInstance.put(`/admin/unban-user/${userId}`, {}, { withCredentials: true });
      setUsers(prev =>
        prev.map(user =>
          user._id === userId
            ? { ...user, isBanned: false, banType: null, banExpiry: null, isActive: true }
            : user
        )
      );
      showAlert('User reactivated successfully!', 'info');
    } catch (err) {
      console.error('Failed to unban user:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  // Modal controls
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [action, setAction] = useState(null);
    const [banDuration, setBanDuration] = useState(1); 
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (userId) => {
        setSelectedUserId(userId);
        setAction("Delete");
        setShowModal(true);
    };

    const handleBanPer = (userId) => {
        setSelectedUserId(userId);
        setAction("Permanent Ban");
        setShowModal(true);
    };

    const handleBanTem = (userId) => {
        setSelectedUserId(userId);
        setAction("Temporary Ban");
        setShowModal(true);
    };

    const handleUnBan = (userId) => {
        setSelectedUserId(userId);
        setAction("unban");
        setShowModal(true);
    };

    const handleReactivateConfirm = (userId) => {
        setSelectedUserId(userId);
        setAction("reactivate");
        setShowModal(true);
    };

    const handleDeactivate = (userId) => {
        setSelectedUserId(userId);
        setAction("Deactivate");
        setShowModal(true);
    };

    const handleConfirm = (action, userId, banDuration) => {
        switch (action) {
          case "Delete":
            handleDeleteUser(userId);
            break;
          case "Temporary Ban":
            handleTemporaryBan(userId, banDuration);
            break;
          case "Permanent Ban":
            handlePermanentBan(userId);
            break;
          case "Deactivate":
            handleDeactivateUser(userId);
            break;
          case "unban":
            handleUnbanUser(userId);
            break;
          case "reactivate":
            handleReactivate(userId);
            break;
          default:
            break;
        }
      
        setShowModal(false); 
      };
      


  return (
    <div className="space-y-6">
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-base-content/70 mt-1">Manage all users of your platform.</p>

          <ManageUsersBTN/>

      </div>

      {/* DaisyUI Alert */}
      {alert.visible && (
        <div className={`fixed top-30 right-10 w-80 p-4 rounded-md shadow-md ${alert.type === 'error' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}>
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
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.isBanned ? (
                        user.banType === 'temporary' ? (
                          <span className="text-orange-500">
                            Temp Banned (until {user.banExpiry ? new Date(user.banExpiry).toLocaleDateString() : 'N/A'})
                          </span>
                        ) : (
                          <span className="text-red-500">Permanently Banned</span>
                        )
                      ) : user.isActive ? (
                        <span className="text-green-500">Active</span>
                      ) : (
                        <span className="text-gray-500">Inactive</span>
                      )}
                    </td>
                    <td className="flex flex-col gap-2">
                      {/* Action buttons */}
                      <div className="flex flex-wrap sm:flex-nowrap gap-2">
                        {/* Permanent Ban / Unban */}
                        {user.isBanned && user.banType === 'permanent' ? (
                          <button
                            className="btn btn-xs sm:btn-sm btn-warning"
                            onClick={() => handleUnBan(user._id)}
                          >
                            Unban (Permanent)
                          </button>
                        ) : (
                          <button
                            className="btn btn-xs sm:btn-sm btn-warning"
                            onClick={() => handleBanPer(user._id)}
                          >
                            Permanent Ban
                          </button>
                        )}

                        {/* Temporary Ban / Unban */}
                        {user.isBanned && user.banType === 'temporary' ? (
                          <button
                            className="btn btn-xs sm:btn-sm btn-warning"
                            onClick={() => handleUnbanUser(user._id)}
                          >
                            Unban (Temporary)
                          </button>
                        ) : (
                          <button
                            className="btn btn-xs sm:btn-sm btn-warning"
                            onClick={() => handleBanTem(user._id)}
                          >
                            Temporary Ban
                          </button>
                        )}

                        {/* Deactivate / Reactivate */}
                        <button
                          className="btn btn-xs sm:btn-sm btn-info"
                          onClick={() =>
                            !user.isActive
                              ? handleReactivateConfirm(user._id)
                              : handleDeactivate(user._id)
                          }
                        >
                          {user.isActive ? 'Deactivate' : 'Reactivate'}
                        </button>

                        {/* Delete */}
                        <button
                          className="btn btn-xs sm:btn-sm btn-error"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </div>

                      {/* Pending Update Request block */}
                      {user.pendingUpdate && (
                        <div className="mt-2 border p-3 rounded bg-base-200 text-xs">
                          <p className="font-semibold text-sm mb-2">Update Request</p>
                          {user.pendingUpdate.firstName && (
                            <p>
                              <span className="font-medium">Name:</span>{' '}
                              {user.pendingUpdate.firstName}
                            </p>
                          )}
                          {user.pendingUpdate.mobile && (
                            <p>
                              <span className="font-medium">Mobile:</span>{' '}
                              {user.pendingUpdate.mobile}
                            </p>
                          )}
                          {user.pendingUpdate.identity && (
                            <p>
                              <span className="font-medium">ID:</span>{' '}
                              <a
                                href={user.pendingUpdate.identity}
                                target="_blank"
                                rel="noreferrer"
                                className="link link-primary"
                              >
                                View Identity
                              </a>
                            </p>
                          )}
                          <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            <button
                              className="btn btn-xs sm:btn-sm btn-success"
                              onClick={() => handleApproveUpdate(user._id)}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-xs sm:btn-sm btn-error"
                              onClick={() => handleRejectUpdate(user._id)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-base-content/70">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Show modal if action is triggered */}
            {showModal && (
                <WarningModal
                action={action}
                userId={selectedUserId}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                banDuration={banDuration}
                setBanDuration={setBanDuration}
                type={'exhibitor'}
                />
            )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => paginate(idx + 1)}
                  className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
