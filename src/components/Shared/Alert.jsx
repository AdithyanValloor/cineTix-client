import React, { useEffect, useState } from "react";

const Alert = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose?.(); // optional callback to clean up from parent
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  if (!visible) return null;

  const typeClasses = {
    success: "alert-success",
    error: "alert-error",
    warning: "alert-warning",
    info: "alert-info",
  };

  return (
    <div
      className={`alert fixed top-5 right-5 z-[9999] shadow-lg w-fit ${typeClasses[type] || "alert-info"}`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Alert;
