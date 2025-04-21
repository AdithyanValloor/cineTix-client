import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PendingRequestsModal from './PendingReq';
import { axiosInstance } from '../../config/axiosInstance';


export const ManageUsersBTN = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch pending requests
  const fetchPendingRequests = async () => {
    try {
      const response = await axiosInstance.get('/admin/pending-exhibitors');
      console.log("RES : ", response);
      
      setPendingRequests(response.data.exhibitors);
    } catch (error) {
      console.error('Failed to fetch pending requests:', error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchPendingRequests(); 
    }
  }, [isModalOpen]);

  // Handle modal toggle
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <div>
      <button
        className="btn btn-primary my-2"
        onClick={toggleModal}
      >
        Pending Approval Requests
      </button>

      {isModalOpen && (
        <PendingRequestsModal
        pendingRequests={pendingRequests}
        toggleModal={toggleModal}
        refresh={fetchPendingRequests}
      />      
      )}
    </div>
  );
};


