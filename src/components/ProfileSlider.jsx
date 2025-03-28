import { BellIcon, ChevronRight, Gift, Handshake, ListVideo, LogOut, MessageSquareMore, Settings, Star, TicketCheck, UserCircle, Wallet, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { clearUser } from '../redux/features/userSlice'
import { useDispatch } from "react-redux";


const ProfileButton = ({ user, onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center gap-3 lg:pl-5 lg:pr-10 cursor-pointer  py-2">
        {/* <UserCircle
            strokeWidth={1}
        /> */}
        
        <div className="bg-red-200 w-12 lg:w-10 rounded-full contain-content">
                <img src="https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="" />
        </div>
        <span className="hidden lg:block">
          Hey, {user ? user : "User"}
        </span>
    </button>
  );
};

const MenuItem = ({onClick, to, icon: Icon, title, description }) => (
    <li className="border-t border-gray-200 text-sm hover:bg-base-100 transition-all duration-300">
      <NavLink className="flex items-center gap-4 w-full h-14 px-4" onClick={onClick} to={to}>
        <Icon strokeWidth={1} />
        <span>
          {title}
          {description && <p className="text-[12px] py-1 font-normal">{description}</p>}
        </span>
        <ChevronRight className="stroke-1 absolute right-1"/>
      </NavLink>
    </li>
);
  

const ProfileSlide = ({ user, showSearch, onClose }) => {

  const dispatch = useDispatch()

  const handleLogout = async () => {

    try {

      const response = await axiosInstance.post("/user/logout");

      console.log(response);

      dispatch(clearUser())
      
                      
    } catch (error) {

      console.error("Error:", error.response.data)
            
        if (error.response) {
            setError(error.response?.data?.message || "Something went wrong!")
        } else {
            alert("Server error. Please try again later.")
        }
    }

  };


  return (
    <div>
      {showSearch && (
        <div
        //   className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          className="fixed inset-0 bg-black/50 backdrop-blur-[5px] z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`bg-base-200 base-content shadow-md w-full md:w-1/2 lg:w-1/4 h-full fixed top-0 right-0 transition-transform duration-500 z-50 
        ${showSearch ? "translate-x-0" : "translate-x-full"}`}
      >
        

        <div className="flex items-center gap-3 w-full p-3 text-lg border-b border-gray-400">

            <div className="bg-red-200 w-12 h-12 rounded-full contain-content">
                <img src="https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="" />
            </div>
    
            {/* <User2/> */}
            <div>
                <p>HEY, {user ? user : "USER"}</p>
                {/* <p className="text-[12px] flex items-center hover:underline underline-offset-4 cursor-pointer transition-all duration-200">Edit profile <ChevronRight size={15}/></p> */}
            </div>

            <button
            onClick={onClose}
            className="p-2 cursor-pointer rounded-full m-3 absolute right-0 scale-125 transition-all duration-500 hover:rotate-180"
            >
             <X strokeWidth={1} />
            </button>

        </div>

        {/* Drop Down */}
        <div className="w-full flex flex-col gap-5 ">
            <ul className="flex flex-col text-lg font-semibold h-full">

                <MenuItem onClick={onClose} to="/user/profile" icon={UserCircle} title="Edit Profile" />
                <MenuItem onClick={onClose} to="/user/notifications" icon={BellIcon} title="Notifications" description="Manage your alerts" />
                <MenuItem onClick={onClose} to="/user/booking-history" icon={TicketCheck} title="Booking History" description="View all your bookings" />
                <MenuItem onClick={onClose} to="/user/watch-list" icon={ListVideo} title="Watchlist" description="Your saved movies" />
                <MenuItem onClick={onClose} to="/user/favourite" icon={Star} title="Favourite" description="Your favourite locations and theaters" />
                <MenuItem onClick={onClose} to="/user/wallet" icon={Wallet} title="Wallet" description="View wallet balance & Saved payment methods" />
                <MenuItem onClick={onClose} to="/user/rewards" icon={Gift} title="Rewards" description="View your rewards and promotions" />
                <MenuItem onClick={onClose} to="/user/account-settings" icon={Settings} title="Account Settings" description="Manage account & permissions" />
                <MenuItem onClick={onClose} to="/user/help" icon={MessageSquareMore} title="Help & Support" description="Contact support & View commonly asked queries" />
                <MenuItem onClick={onClose} to="/user/join-cinetix" icon={Handshake} title="Join us" description="Join us to list your Shows and Theaters" />
                <MenuItem onClick={handleLogout} icon={LogOut} title="Logout"/>

            </ul>
        </div>
      </div>
    </div>
  );
};

const ProfileComponent = ({username}) => {


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
      
  const [showSlider, setShowSlider] = useState(false);

  const handleSlider = () => setShowSlider((prev) => !prev);

  // Prevent scrolling when slider is open
  if (showSlider) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return (
    <>
      <ProfileButton user={username} onClick={handleSlider} />
      <ProfileSlide user={username} showSearch={showSlider} onClose={handleSlider} />
    </>
  );
};

export default ProfileComponent;
