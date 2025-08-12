import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import {
  SparklesIcon,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";

// Import images
import Img1 from "../../assets/Hunza.jpg";
import Img2 from "../../assets/Abtabad.jpg";
import Img3 from "../../assets/Deosai.jpg";
import Img4 from "../../assets/Drawar.jpg";
import Img5 from "../../assets/Gilgit.jpg";
import Img6 from "../../assets/Naran.jpg";
import Img7 from "../../assets/Noor.jpg";
import Img8 from "../../assets/Kalftin-karachi.jpg";
import Img9 from "../../assets/Badsahi.jpg";

// Static data outside component
const PLACES = [
  { title: "Hunza Valley", img: Img1, location: "Gilgit-Baltistan", rating: 4.9, description: "Majestic mountains and serene valleys in the Karakoram range" },
  { title: "Attabad Lake", img: Img2, location: "Gojal Valley", rating: 4.7, description: "Turquoise lake formed after a massive landslide in 2010" },
  { title: "Deosai Plains", img: Img3, location: "Skardu", rating: 4.8, description: "The 'Land of Giants' - one of the highest plateaus in the world" },
  { title: "Derawar Fort", img: Img4, location: "Cholistan Desert", rating: 4.5, description: "Massive square fortress in the heart of the desert" },
  { title: "Naran & Kaghan", img: Img5, location: "Khyber Pakhtunkhwa", rating: 4.6, description: "Heaven for trekkers with stunning alpine scenery" },
  { title: "Pir Ghaib Waterfalls", img: Img6, location: "Bolan", rating: 4.3, description: "Hidden waterfalls surrounded by rocky mountains" },
  { title: "Noor Mahal", img: Img7, location: "Bahawalpur", rating: 4.4, description: "Italian-style palace with exquisite architecture" },
  { title: "Clifton Beach", img: Img8, location: "Karachi", rating: 4.2, description: "Popular beach with camel rides and vibrant atmosphere" },
  { title: "Badshahi Mosque", img: Img9, location: "Lahore", rating: 4.9, description: "Iconic Mughal-era mosque with breathtaking architecture" },
];

// Reusable card component
function PlaceCard({ place, isHovered, onHover, onClick }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-xl bg-white border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      onMouseEnter={onHover}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(place.img)}
      role="button"
      tabIndex={0}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={place.img}
          alt={place.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
          loading="lazy"
          decoding="async"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div>
              <h3 className="text-xl font-bold text-white">{place.title}</h3>
              <div className="flex items-center mt-1 text-white/90">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{place.location}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">{place.title}</h3>
          <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-amber-500 mr-1" />
            <span className="font-semibold">{place.rating}</span>
          </div>
        </div>

        <div className="flex items-center mt-2 text-gray-600">
          <MapPin className="h-4 w-4 mr-1 text-red-500" />
          <span>{place.location}</span>
        </div>

        <p className="mt-4 text-gray-700 line-clamp-2">{place.description}</p>

        <button
          className="mt-6 group flex items-center text-red-700 font-medium hover:text-red-800 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
  isHovered: PropTypes.bool,
  onHover: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Modal component
function ImageModal({ img, onClose }) {
  const handleEsc = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {img ? (
          <img
            src={img}
            alt="Expanded view"
            className="w-full max-h-[80vh] object-contain"
            loading="eager"
          />
        ) : (
          <div className="h-96 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        <button
          className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

ImageModal.propTypes = {
  img: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b mt-12 from-[#f8f5f2] via-[#f2e8e5] to-[#f8f5f2]">
      {/* Decorative BG */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-red-500/10 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-5 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200 shadow-sm">
            <SparklesIcon className="mr-2 h-5 w-5 fill-red-500 stroke-red-500" />
            <span className="text-red-800 font-medium">Discover Pakistan's Wonders</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Explore <span className="text-red-600">Breathtaking</span> Destinations <br className="hidden lg:block" />
            <span className="bg-gradient-to-r from-amber-700 via-red-700 to-amber-700 bg-clip-text text-transparent">
              Across Pakistan
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover hidden valleys, pristine lakes, historic landmarks, and vibrant culture.
          </p>
        </div>

        {/* Destinations */}
        <section className="w-full mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">Must-Visit Places in Pakistan</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hover over the destinations to explore and click to view in detail
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLACES.map((place, index) => (
              <PlaceCard
                key={place.title}
                place={place}
                isHovered={hoveredIndex === index}
                onHover={setHoveredIndex}
                onClick={handleImageClick}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-8 border border-red-100 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready for Your Adventure?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Join thousands of travelers who have explored Pakistan's hidden gems.
          </p>
          <button className="group flex items-center justify-center gap-3 px-7 py-4 mx-auto rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <span>Start Planning Your Trip</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <ImageModal img={selectedImage} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
