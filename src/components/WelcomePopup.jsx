import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function WelcomePopup() {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isUserAuth && !localStorage.getItem("welcomePopupShown")) {
      setIsOpen(true);
      localStorage.setItem("welcomePopupShown", "true"); // Prevents future popups
      const timer = setTimeout(() => setIsOpen(false), 3000); // Disappears after 3s
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [isUserAuth]);

  return (
    // isOpen && (
      <div className={`fixed top-20 transform left-1/2 -translate-x-1/2 flex items-center transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 -z-50"}`}>
        <div className="bg-gray-100 p-3 rounded-lg shadow-lg text-center animate-fade-in">
          <h2 className="text-xl text-black font-bold">Welcome, {userData.name}!</h2>
          <p className="text-black">We're glad to have you here.</p>
        </div>
      </div>
    // )
  );
}
