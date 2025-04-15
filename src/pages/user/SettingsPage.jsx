import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import WarningModal from "../../components/WarningModal";

function UserSettingsPage() {
  const navigate = useNavigate();

  const [action, setAction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleActionClick = (type) => {
    setAction(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAction(null);
  };

  const handleConfirmAction = async () => {
    try {
      if (action === "Deactivate") {
        const res = await axiosInstance.put("/users/deactivate-account");
        toast.success(res.data.message);
      } else if (action === "Delete") {
        const res = await axiosInstance.delete("/users/delete-account");
        toast.success(res.data.message);
      }
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${action.toLowerCase()} account`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 bg-base-200">
      <div className="w-full max-w-md bg-base-100 p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
          Account Settings
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => handleActionClick("Deactivate")}
            className="w-full bg-yellow-500 text-white py-2 sm:py-3 rounded hover:bg-yellow-600 transition cursor-pointer text-sm sm:text-base"
          >
            Deactivate Account
          </button>

          <button
            onClick={() => handleActionClick("Delete")}
            className="w-full bg-red-600 text-white py-2 sm:py-3 rounded hover:bg-red-700 transition cursor-pointer text-sm sm:text-base"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Warning Modal */}
      {showModal && (
        <WarningModal
          action={action}
          type="account"
          onClose={handleCloseModal}
          onConfirm={() => {
            handleConfirmAction();
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
}

export default UserSettingsPage;
