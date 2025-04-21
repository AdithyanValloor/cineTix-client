import React from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { CloseButton } from '../Button/Button';


const PendingRequestsModal = ({ pendingRequests, toggleModal, refresh }) => {
  // Approve exhibitor
  const handleApprove = async (userId) => {
    try {
      await axiosInstance.post(`/admin/approve-exhibitor/${userId}`);
      alert('Exhibitor Approved');
      refresh(); 
    } catch (error) {
      console.error('Error approving exhibitor:', error);
    }
  };

  // Reject exhibitor
  const handleReject = async (userId) => {
    try {
      await axiosInstance.post(`/admin/reject-exhibitor/${userId}`);
      alert('Exhibitor Rejected');
      refresh(); 
    } catch (error) {
      console.error('Error rejecting exhibitor:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl relative">
        <CloseButton onClick={toggleModal}/>
        <h2 className="text-2xl font-semibold mb-4">Pending Approval Requests</h2>
  
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {pendingRequests.length === 0 ? (
            <p className="text-gray-600">No pending requests</p>
          ) : (
            pendingRequests.map((user) => (
              <div
                key={user._id}
                className="p-4 border border-gray-200 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => handleApprove(user._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => handleReject(user._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
  
};

export default PendingRequestsModal;
