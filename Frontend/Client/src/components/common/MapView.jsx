import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Img1 from '../../assets/Hunza Valley.jpg'
import Img2 from '../../assets/Attabad Lake.jpg'
import Img3 from '../../assets/Swat Valley.jpg'
import Img4 from '../../assets/Naran.jpg'
import Img5 from '../../assets/Fairy Meadows.jpg'
import Img6 from '../../assets/Deosai National Park.jpg'
import Img7 from '../../assets/Mohenjo-daro .jpg'
import Img8 from '../../assets/Faisal Mosque, Islamabad.jpg'
import Img9 from '../../assets/Badsahi.jpg'
import Img10 from '../../assets/IMG9.jpg'
import Img11 from '../../assets/IMg12.jpg'
import Img12 from '../../assets/Mure.jpg'
import Img13 from '../../assets/kalash.jpg'
import Img14 from '../../assets/Ranikot Fort.jpg'
import Img15 from '../../assets/gawadr.jpg'
import Img16 from '../../assets/Hingol National Park.jpg'
import Img17 from '../../assets/Noor.jpg'
import Img18 from '../../assets/Churna.jpg'
import Img19 from '../../assets/Taxila.jpg'
import Img20 from '../../assets/Mazar-e-Quaid, Karachi.jpg'
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const destinations = [
  {
    name: "Hunza Valley",
    coords: [36.3091, 74.6444],
    image: Img1,
  },
  {
    name: "Attabad Lake",
    coords: [36.3186, 74.6770],
    image: Img2,
  },
  {
    name: "Swat Valley",
    coords: [35.2229, 72.4258],
    image: Img3,
  },
  {
    name: "Naran & Kaghan",
    coords: [34.9042, 73.6487],
    image: Img4,
  },
  {
    name: "Fairy Meadows",
    coords: [35.0101, 74.4767],
    image: Img5,
  },
  {
    name: "Deosai National Park",
    coords: [35.0228, 75.3977],
    image: Img6,
  },
  {
    name: "Mohenjo-daro",
    coords: [27.3294, 68.1380],
    image: Img7,
  },
  {
    name: "Faisal Mosque, Islamabad",
    coords: [33.7295, 73.0378],
    image: Img8,
  },
  {
    name: "Badshahi Mosque, Lahore",
    coords: [31.5889, 74.3091],
    image: Img9,
  },
  {
    name: "Skardu",
    coords: [35.2976, 75.6330],
    image:Img10,
  },
  {
    name: "Neelum Valley",
    coords: [34.5500, 73.9383],
    image: Img11,
  },
  {
    name: "Murree",
    coords: [33.9070, 73.3945],
    image: Img12,
  },
  {
    name: "Kalash Valley, Chitral",
    coords: [36.4975, 71.7861],
    image: Img13,
  },
  {
    name: "Ranikot Fort",
    coords: [25.4334, 68.2111],
    image: Img14,
  },
  {
    name: "Gwadar",
    coords: [25.1260, 62.3255],
    image: Img15,
  },
  {
    name: "Hingol National Park",
    coords: [25.2151, 66.6085],
    image: Img16,
  },
  {
    name: "Noor Mahal, Bahawalpur",
    coords: [29.3956, 71.6833],
    image: Img17,
  },
  {
    name: "Churna Island",
    coords: [24.8172, 67.6223],
    image: Img18,
  },
  {
    name: "Taxila",
    coords: [33.7460, 72.8090],
    image: Img19,
  },
  {
    name: "Mazar-e-Quaid, Karachi",
    coords: [24.9056, 67.0972],
    image: Img20,
  },
];

const MapView = () => {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="py-8 bg-gradient-to-b from-[#f8f5f2] via-[#f2e8e5] to-[#f8f5f2]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Destinations</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg ${
                viewMode === "grid"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded-lg ${
                viewMode === "map"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Map View
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {destinations.map((dest, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Map View
          <MapContainer
            center={[30, 70]}
            zoom={5}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {destinations.map((dest, idx) => (
              <Marker key={idx} position={dest.coords}>
                <Popup>
                  <strong>{dest.name}</strong>
                  <br />
                  <img
                    src={dest.image}
                    alt={dest.name}
                    style={{ width: "150px", borderRadius: "8px" }}
                  />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default MapView;