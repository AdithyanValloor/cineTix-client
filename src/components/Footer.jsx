import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoDark, LogoWhite } from './Logo';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '#') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setIsDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
      setIsDarkMode(prefersDark);
    }

    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setIsDarkMode(currentTheme === "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-base-300 text-base-content border-t border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto py-10 px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + Description + Socials */}
        <div className="space-y-3">
          {isDarkMode ? <LogoWhite /> : <LogoDark />}
          <p className="text-sm text-gray-400">
            CineTix – Your one-stop platform for booking the best movie experiences across theaters.
          </p>
          <div className="flex gap-4 mt-4 text-xl text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF className="hover:text-white" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="hover:text-white" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="hover:text-white" /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube className="hover:text-white" /></a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h6 className="footer-title">Explore</h6>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link className="link link-hover" to="/">Home</Link>
            <Link className="link link-hover" to="/movies">Browse Movies</Link>
            <Link className="link link-hover" to="/movies">Book Tickets</Link>
            <Link className="link link-hover" to="/user/rewards">Offers & Rewards</Link>
          </nav>
        </div>

        {/* Support */}
        <div>
          <h6 className="footer-title">Support</h6>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link className="link link-hover" to="/user/help">FAQs</Link>
            <Link className="link link-hover" to="/user/help">Help Center</Link>
            <Link className="link link-hover" to="/user/help">Cancellation & Refunds</Link>
            <Link className="link link-hover" to="/report">Report Issue</Link>
          </nav>
        </div>

        {/* Company */}
        <div>
          <h6 className="footer-title">Company</h6>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link className="link link-hover" to="/about">About CineTix</Link>
            <Link className="link link-hover" to="#">Contact Us</Link>
            <Link className="link link-hover" to="#">Careers</Link>
            <Link className="link link-hover" to="/user/join-cinetix">Partner with Us</Link>
          </nav>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()} CineTix. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
