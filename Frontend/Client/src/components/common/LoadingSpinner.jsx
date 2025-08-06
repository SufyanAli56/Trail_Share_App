// components/common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => {
  return (
    <div className={`flex justify-center items-center ${fullPage ? 'h-screen' : 'py-8'}`}>
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-b-transparent rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;