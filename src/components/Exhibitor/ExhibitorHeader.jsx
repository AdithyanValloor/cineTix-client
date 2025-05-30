import React, { useState, useEffect } from 'react';
import { LogoDark, LogoWhite } from '../Logo';
import ThemeToggle from '../ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from '../../redux/features/userSlice';
import { axiosInstance } from '../../config/axiosInstance'; 

function ExhibitorHeader({ headline, toggleSidebar }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  console.log("IS AUTH:", isUserAuth);
  console.log(userData);
  

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToSet = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', themeToSet);
    setIsDarkMode(themeToSet === 'dark');

    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(currentTheme === 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/exhibitor/logout', {}, { withCredentials: true });
      navigate('/exhibitor/login');

      dispatch(clearUser())

    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-base-200 fixed w-full text-base-content h-24 lg:h-20 flex items-center justify-between z-50 shadow-md px-4">
      
      {/* Hamburger (mobile) */}
      <button className="sm:hidden text-xl" onClick={toggleSidebar}>
        <Menu />
      </button>

      {/* Headline (hidden in small screens) */}
      {headline}

      {/* Logo */}
      <div  className="absolute left-1/2 transform -translate-x-1/2">
        <Link to={'/exhibitor/dashboard'} onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          {isDarkMode ? <LogoWhite size={120} /> : <LogoDark size={120} />}
        </Link>
      </div>

      

      {/* Theme Toggle + Logout */}
      <div className="absolute right-4 flex items-center gap-2">
        <ThemeToggle />
        {isUserAuth && <button
          onClick={handleLogout}
          className="btn btn-sm btn-error text-white"
        >
          Logout
        </button>}
      </div>
    </header>
  );
}

export default ExhibitorHeader;
