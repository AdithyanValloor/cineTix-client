const WarningModal = ({ action, onClose, onConfirm, type }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-lg font-bold text-red-500">
              Are you sure you want to
              {
                action === "Delete" && " permanently delete " ||
                action === "Deactivate" && " deactivate " ||
                ` ${action} `
              }
              this {type || 'user'}?
            </h2>
  
            <div className="mt-6 flex justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
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

export default WarningModal
  