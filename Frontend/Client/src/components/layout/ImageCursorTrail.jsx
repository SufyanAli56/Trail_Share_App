"use client";

import React, { useState } from "react";
import { SparklesIcon } from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";

// ✅ Import images normally
import Img1 from "../../assets/Hunza.jpg";
import Img2 from "../../assets/Abtabad.jpg";
import Img3 from "../../assets/Deosai.jpg";
import Img4 from "../../assets/Drawar.jpg";
import Img5 from "../../assets/Gilgit.jpg";
import Img6 from "../../assets/Naran.jpg";
import Img7 from "../../assets/Noor.jpg";
import Img8 from "../../assets/Kalftin-karachi.jpg";
import Img9 from "../../assets/Badsahi.jpg";

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Pakistani tourist places
  const places = [
    { title: "Hunza Valley", img: Img1 },
    { title: "Attabad Lake", img: Img2 },
    { title: "Deosai Plains", img: Img3 },
    { title: "Derawar Fort (Cholistan Desert)", img: Img4 },
    { title: "Narran & Kagan", img: Img5 },
    { title: "Pir Ghaib Waterfalls (Bolan)", img: Img6 },
    { title: "Noor Mahal", img: Img7 },
    { title: "Clifton Beach (Karachi)", img: Img8 },
    { title: "Badshahi Mosque", img: Img9 },
  ];

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center px-4 mt-12">
      {/* Hero Section */}
      <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-4">
        Welcome to <span className="text-blue-600">TravelSite Pakistan</span>
      </h1>
      <p className="text-gray-600 text-lg text-center max-w-3xl mb-16">
        Discover the hidden gems of Pakistan — explore valleys, lakes, meadows,
        and iconic landmarks.
      </p>

      {/* Image Grid */}
      <section className="w-full max-w-5xl mb-12">
        <div className="text-center mb-6">
          <div className="inline-flex items-center mb-4 px-4 py-2 border rounded-full bg-white/70 backdrop-blur-sm">
            <SparklesIcon className="mr-2 text-pink-300" />
            Explore Destinations
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Hover the images to explore Pakistan's beauty
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map((place, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleImageClick(place.img)}
            >
              <img
                src={place.img}
                alt={place.title}
                className="w-full h-48 object-cover transition-transform duration-500"
                style={{
                  transform:
                    hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                }}
                loading="lazy"
                decoding="async"
              />
              {hoveredIndex === index && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    {place.title}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Expanded view"
                className="w-full max-h-[80vh] object-contain"
                loading="eager"
              />
            ) : (
              <LoadingSpinner />
            )}
            <button
              className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
