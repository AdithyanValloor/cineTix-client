import React, { useState } from "react";

const WarningModal = ({ action, userId, onClose, onConfirm, banDuration, setBanDuration, type}) => {
  const handleConfirm = () => {
    onConfirm(action, userId, banDuration);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 ${action ? "block" : "hidden"}`}>
      {/* DaisyUI Modal */}
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-lg font-bold text-red-500">
            Are you sure you want to 
                 {    
                    action === "Permanent Ban" && " permanently ban " 
                    || action === "Temporary Ban" && " temporarily ban "
                    || action === "Delete" && " permanently delete " 
                    || action === "Deactivate" && " deactivate " 
                    || (` ${action} `)
                } 
            this {type ? type : 'user'}?
          </h2>
          <div className="mt-4">
            {action === "Temporary Ban" && (
              <div className="flex flex-col">
                <label htmlFor="banDuration" className="text-sm">
                  Enter duration (days) for temporary ban:
                </label>
                <input
                  id="banDuration"
                  type="number"
                  min="1"
                  value={banDuration}
                  onChange={(e) => setBanDuration(e.target.value)}
                  className="mt-2 p-2 border border-gray-300 rounded"
                  placeholder="Duration in days"
                />
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 cursor-pointer"
            >
              Confirm {action}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
