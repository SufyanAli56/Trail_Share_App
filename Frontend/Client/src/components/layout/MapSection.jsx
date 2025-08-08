import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom red marker icon to match theme
const createRedIcon = () => {
  return new L.Icon({
    iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><path fill="%23dc2626" d="M16 2C9.37 2 4 7.37 4 14c0 10 12 16 12 16s12-6 12-16c0-6.63-5.37-12-12-12z"/><circle cx="16" cy="14" r="6" fill="%23fff"/></svg>',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });
};

// Define locations for dynamic markers
const locations = [
  {
    id: 1,
    position: [36.3167, 74.65],
    name: "Hunza Valley",
    description: "A beautiful place in Gilgit-Baltistan, known for its stunning landscapes.",
    rating: 4.9
  },
  {
    id: 2,
    position: [33.6844, 73.0479],
    name: "Islamabad",
    description: "The capital city of Pakistan, known for its greenery and urban planning.",
    rating: 4.7
  },
  {
    id: 3,
    position: [34.0150, 71.5249],
    name: "Peshawar",
    description: "Historical city with rich cultural heritage.",
    rating: 4.5
  },
  {
    id: 4,
    position: [24.8607, 67.0011],
    name: "Karachi",
    description: "Pakistan's largest city and economic hub.",
    rating: 4.3
  },
  {
    id: 5,
    position: [31.5204, 74.3587],
    name: "Lahore",
    description: "Cultural heart of Pakistan with Mughal architecture.",
    rating: 4.8
  },
  {
    id: 6,
    position: [35.9208, 74.3144],
    name: "Naran & Kaghan",
    description: "Popular tourist destination with scenic valleys.",
    rating: 4.9
  },
];

export default function MapSection() {
  const [isMounted, setIsMounted] = useState(false);
  const redIcon = createRedIcon();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section
      className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100"
      style={{
        height: "80vh",
        backgroundColor: "#f0f0f0",
      }}
      aria-label="Interactive map of Pakistan"
    >
      {/* Adventure elements matching home page */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-red-500/10 blur-3xl z-[1000]"></div>
      <div className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl z-[1000]"></div>

      <MapContainer
        center={[30.3753, 69.3451]} // Pakistan center
        zoom={5}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      >
        {/* Styled Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Scale Control */}
        <ScaleControl position="bottomleft" />

        {/* Dynamic Markers with theme styling */}
        {locations.map((location) => (
          <Marker 
            key={location.id} 
            position={location.position}
            icon={redIcon}
          >
            <Popup className="custom-popup">
              <div className="p-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-red-700">{location.name}</h3>
                  <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    <span className="font-semibold">{location.rating}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1 fill-amber-500">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{location.description}</p>
                <div className="mt-3 flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-red-500">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {location.position[0].toFixed(4)}°N, {location.position[1].toFixed(4)}°E
                  </span>
                </div>
                <button className="mt-3 w-full py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-colors">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Custom popup styling */}
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-left: 4px solid #dc2626;
          padding: 0;
        }
        .custom-popup .leaflet-popup-tip-container {
          display: none;
        }
      `}</style>
    </section>
  );
}