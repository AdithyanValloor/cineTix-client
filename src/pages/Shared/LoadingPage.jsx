import React from 'react';
import { useSelector } from 'react-redux'; 

function LoadingPage() {
  const loading = useSelector((state) => state.user.loading); 

  if (!loading) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      {/* Loading Spinner */}
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid mb-6"></div>
      
      {/* Loading Text */}
      <p className="text-lg sm:text-xl font-semibold text-gray-700">Loading...</p>
      <p className="text-sm sm:text-base text-gray-500 mt-2">Please wait while we fetch your data.</p>
    </div>
  );
}

export default LoadingPage;
