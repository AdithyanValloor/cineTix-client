import React, { useState, useEffect } from 'react'
import AuthForm from './AuthForm';
import { ButtonPrimary, CloseButton } from './Button/Button';

function SignupCard ({showAuthBox, onClose}){
  useEffect(() => {
      if (showAuthBox) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = ''; // Cleanup on unmount
      };
    }, [showAuthBox]);
  
    return (
      <>
        {showAuthBox && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[5px] z-40"
          ></div>
        )}
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100 shadow-lg p-6 rounded-3xl z-50 transition-all duration-300 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-[90%] sm:w-[400px] md:w-1/2 lg:w-2/3 xl:w-1/4 min-w-[280px]
          ${showAuthBox ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
          onClick={(e) => e.stopPropagation()} // Prevents clicks inside from closing
        >
          <CloseButton onClick={onClose}/>
          <AuthForm/>
        </div>
      </>
    );
}

function Auth() {

  const [showAuthBox, setShowAuthBox] = useState(false);

  const handleAuthBox = () => setShowAuthBox((prev) => !prev)

  return (
    <div>
      <div className='mx-5'>
        <ButtonPrimary text={"Sign up"} onClick={handleAuthBox}/>
      </div>
      <SignupCard showAuthBox={showAuthBox} onClose={handleAuthBox}/>
    </div>
  )
}

export default Auth