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
      <div className={`fixed top-20 transform left-1/2 -translate-x-1/2 flex items-center transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100 z-50" : "-translate-y-10 opacity-0 -z-5 pointer-events-none"}`}>
        <div className="bg-gray-200 p-1.5 md:p-3 rounded-lg shadow-lg text-center animate-fade-in">
          <h2 className="md:text-xl text-black font-bold">Welcome, {userData.firstName} {userData.lastName}!</h2>
          <p className="text-sm lg:text-md text-black">We're glad to have you here.</p>
        </div>
      </div>
    // )
  );
}
