import React, {useState, useEffect} from 'react'
import Nav from './Nav'
import { LogoDark, LogoWhite } from './Logo'
import SearchComponent from './SearchSlider'
import ThemeToggle from './ThemeToggle'
import ProfileComponent from './ProfileSlider'
import LocationComponent from './Location'
import Auth from './Auth'
import { useSelector } from "react-redux";
import WelcomePopup from './WelcomePopup'
import { Link } from 'react-router-dom'

function Header() {

  const { isUserAuth, userData } = useSelector((state) => state.user);

  console.log("IS AUTH:", isUserAuth);
  console.log(userData);
  
  

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setIsDarkMode(savedTheme === "dark");
    } else {
     
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light")

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
    <div>
      <header className="bg-base-200 fixed w-full text-base-content h-24 lg:p-0 lg:h-20 flex items-center justify-between z-50 flex-row shadow-md">
        <WelcomePopup/>
        {/* Logo */}
        <div className='lg:static left-0 ml-5'>
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}>
            {isDarkMode ? <LogoWhite size={120} /> : <LogoDark size={120} />}
          </Link>
          <div className='absolute bottom-1 lg:hidden'>
            <LocationComponent />
          </div>
        </div>
      
        {/* Navigation */}
        <div className="absolute shadow md:shadow-none lg:static md:border-0  top-full bg-base-100 md:bg-transparent md:top-auto w-full lg:w-auto flex items-center justify-center lg:bg-transparent lg:top-auto">
          <Nav />
        </div>
      
        {/* Right Section - Buttons & Profile | DEVICE > MD |*/}
        <div className="lg:flex hidden">
          <ThemeToggle />
          <SearchComponent />
          <div className="flex items-center">
            <LocationComponent />
            

            {isUserAuth ? <ProfileComponent /> :  <Auth/> }
          </div>
        </div>

        {/* Right Section - Buttons & Profile | DEVICE <= MD |*/}
        <div className="lg:hidden flex items-center">
          <div className='flex'>
            <ThemeToggle />
            <SearchComponent />
          </div>

          <div className="flex items-center right-0 px-2 mr-4">
            {isUserAuth ? <ProfileComponent /> :  <Auth/> }
          </div>
        </div>

      </header>
    
    </div>
  )
}

export default Header
