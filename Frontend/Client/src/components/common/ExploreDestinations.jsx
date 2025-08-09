import React from 'react';
import bridgeImage from '../../assets/Noor.jpg'; // adjust path based on your folder structure

const ExploreDestinations = ({
  title = "Explore Destinations",
  subtitle = "Discover amazing places around the world. Your adventure starts here!",
  bgImage = bridgeImage,
  height = "h-screen",
  overlayOpacity = "bg-opacity-50"
}) => {
  return (
    <div
      className={`relative w-full bg-cover bg-center ${height}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`}></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-2xl md:text-6xl font-bold mb-4 drop-shadow-lg bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl drop-shadow-md text-white">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ExploreDestinations;
