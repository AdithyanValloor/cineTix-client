import { ChevronLeft, Heart, Info, X } from "lucide-react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";





export const ButtonPrimary = ({ type, text, className, onClick = () => {} }) => {
  return (
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      className={`text-white px-4 py-2 rounded-md cursor-pointer bg-[#e30613] hover:bg-red-500  transition-all duration-300 ${className}`}
    >
      {text}
    </button>
  );
};

export const ButtonPrimaryOutline = ({ type, text, className, onClick = () => {} }) => {
  return (
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      className={`hover:text-white text-[#e30613] px-4 py-2 rounded-md cursor-pointer border border-[#e30613]  hover:bg-red-500 transition-all duration-300 ${className}`}
    >
      {text}
    </button>
  );
};

export const CloseButton = ({onClick = () => {}}) => {
    return(
        <button onClick={onClick} className='absolute right-5 p-2 rounded-full cursor-pointer transition-all duration-500 hover:scale-120 hover:rotate-180'>
            <X className='stroke-2 lg:stroke-1 size-7'/>
        </button>
    )
}

export const BackButton = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return(
      <button onClick={handleBack} className=' right-5 p-2 rounded-full cursor-pointer transition-all duration-500 hover:scale-120'>
          <ChevronLeft className='stroke-2 lg:stroke-1 size-7'/>
      </button>
  )
}

export const ButtonGoogle = ({ type, text, onClick = () => {} }) => {
    return (
      <button
        type={type ? type : 'button'}
        onClick={onClick}
        className="bg-slate-100 flex justify-center p-2 rounded-lg text-black hover:bg-slate-300 transition-all duration-200 cursor-pointer"
      >
        <FcGoogle className="absolute left-3 text-2xl mr-2" />
        {text}
      </button>
    );
};

export const ButtonFavourite = () => {
  return(
    <button className="cursor-pointer p-2 hover:scale-105 transition-all duration-200">
      <Heart/>
    </button>
  )
}

export const ButtonInfo = () => {
  return(
    <button className="cursor-pointer p-2 hover:scale-105 transition-all duration-200 flex gap-1">
      <Info/>
      INFO
    </button>
  )
}