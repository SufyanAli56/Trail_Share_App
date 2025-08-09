import React from "react";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-[#fef8f6] via-[#fcefe8] to-[#fef8f6]">
      {/* Hero Section */}
      <div
        className="relative w-full h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://www.pexels.com/photo/majestic-sunrise-over-nanga-parbat-29401243/')",
        }}
      >
        {/* Semi-transparent overlay so the image is still visible */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 bg-gradient-to-r from-amber-700 text-center via-red-700 to-amber-700 bg-clip-text text-transparent px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            About Our Journey
          </h1>
          <p className="max-w-2xl mx-auto text-lg">
            Discover Pakistan’s beauty with our curated trips and unforgettable
            experiences.
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-5xl mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We are passionate travel enthusiasts dedicated to showcasing the
          natural beauty, cultural heritage, and vibrant cities of Pakistan.
          From the serene valleys of Hunza to the bustling streets of Karachi,
          our mission is to help travelers explore, plan, and enjoy their trips
          effortlessly.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pb-12 px-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-bold text-red-600">200+</h3>
          <p className="text-gray-700">Destinations Covered</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-bold text-red-600">5K+</h3>
          <p className="text-gray-700">Happy Travelers</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-bold text-red-600">10+</h3>
          <p className="text-gray-700">Years of Experience</p>
        </div>
      </div>
    </div>
  );
}
