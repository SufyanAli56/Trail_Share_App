import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ScaleControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom red icon for consistency with theme
const createRedIcon = () => {
  return new L.Icon({
    iconUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><path fill="%23dc2626" d="M16 2C9.37 2 4 7.37 4 14c0 10 12 16 12 16s12-6 12-16c0-6.63-5.37-12-12-12z"/><circle cx="16" cy="14" r="6" fill="%23fff"/></svg>',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });
};

const locations = [
  { id: 1, position: [36.3167, 74.65], name: "Hunza Valley", description: "Explore the beauty of Hunza Valley, a stunning destination in Pakistan.", rating: 4.3 },
  { id: 2, position: [33.6844, 73.0479], name: "Islamabad", description: "Explore the beauty of Islamabad, a stunning destination in Pakistan.", rating: 4.3 },
  { id: 3, position: [34.015, 71.5249], name: "Peshawar", description: "Explore the beauty of Peshawar, a stunning destination in Pakistan.", rating: 4.8 },
  { id: 4, position: [24.8607, 67.0011], name: "Karachi", description: "Explore the beauty of Karachi, a stunning destination in Pakistan.", rating: 4.6 },
  { id: 5, position: [31.5204, 74.3587], name: "Lahore", description: "Explore the beauty of Lahore, a stunning destination in Pakistan.", rating: 4.7 },
  { id: 6, position: [35.12, 73.7], name: "Naran", description: "Explore the beauty of Naran, a stunning destination in Pakistan.", rating: 4.4 },
  { id: 7, position: [34.8491, 73.4723], name: "Kaghan", description: "Explore the beauty of Kaghan, a stunning destination in Pakistan.", rating: 4.5 },
  { id: 8, position: [35.3075, 75.5489], name: "Skardu", description: "Explore the beauty of Skardu, a stunning destination in Pakistan.", rating: 4.9 },
  { id: 9, position: [33.907, 73.3907], name: "Murree", description: "Explore the beauty of Murree, a stunning destination in Pakistan.", rating: 4.6 },
  { id: 10, position: [35.215, 72.4258], name: "Mingora", description: "Explore the beauty of Mingora, a stunning destination in Pakistan.", rating: 4.7 },
  { id: 11, position: [30.1798, 66.975], name: "Quetta", description: "Explore the beauty of Quetta, a stunning destination in Pakistan.", rating: 4.6 },
  { id: 12, position: [30.1575, 71.5249], name: "Multan", description: "Explore the beauty of Multan, a stunning destination in Pakistan.", rating: 4.5 },
  { id: 13, position: [29.3956, 71.6836], name: "Bahawalpur", description: "Explore the beauty of Bahawalpur, a stunning destination in Pakistan.", rating: 4.6 },
  { id: 14, position: [31.4504, 73.135], name: "Faisalabad", description: "Explore the beauty of Faisalabad, a stunning destination in Pakistan.", rating: 4.7 },
  { id: 15, position: [33.6007, 73.0679], name: "Rawalpindi", description: "Explore the beauty of Rawalpindi, a stunning destination in Pakistan.", rating: 4.5 },
  { id: 16, position: [32.1877, 74.1945], name: "Gujranwala", description: "Explore the beauty of Gujranwala, a stunning destination in Pakistan.", rating: 4.4 },
  { id: 17, position: [32.4945, 74.5229], name: "Sialkot", description: "Explore the beauty of Sialkot, a stunning destination in Pakistan.", rating: 4.6 },
  { id: 18, position: [32.0836, 72.6711], name: "Sargodha", description: "Explore the beauty of Sargodha, a stunning destination in Pakistan.", rating: 4.5 },
  { id: 19, position: [25.396, 68.3578], name: "Hyderabad", description: "Explore the beauty of Hyderabad, a stunning destination in Pakistan.", rating: 4.4 },
  { id: 20, position: [34.1688, 73.2215], name: "Abbottabad", description: "Explore the beauty of Abbottabad, a stunning destination in Pakistan.", rating: 4.6 },
  { id: 21, position: [35.85, 71.8], name: "Chitral", description: "Explore the beauty of Chitral, a stunning destination in Pakistan.", rating: 4.9 },
  { id: 22, position: [30.3814, 67.725], name: "Ziarat", description: "Explore the beauty of Ziarat, a stunning destination in Pakistan.", rating: 4.6 },
  { id: 23, position: [35.4186, 76.3307], name: "Khaplu", description: "Explore the beauty of Khaplu, a stunning destination in Pakistan.", rating: 4.8 },
  { id: 24, position: [35.1493, 76.3], name: "Ghanche", description: "Explore the beauty of Ghanche, a stunning destination in Pakistan.", rating: 4.7 },
  { id: 25, position: [35.222, 72.4258], name: "Swat", description: "Explore the beauty of Swat, a stunning destination in Pakistan.", rating: 4.9 },
  { id: 26, position: [28.4686, 70.3086], name: "Derawar Fort", description: "Explore the beauty of Derawar Fort, a stunning destination in Pakistan.", rating: 4.5 },
  { id: 27, position: [32.6475, 73.01], name: "Khewra Salt Mine", description: "Explore the beauty of Khewra Salt Mine, a stunning destination in Pakistan.", rating: 4.6 },
  { id: 28, position: [25.5114, 65.5284], name: "Hingol National Park", description: "Explore the beauty of Hingol National Park, a stunning destination in Pakistan.", rating: 4.7 },
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
      className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100 mt-12"
      style={{ height: "80vh", backgroundColor: "#f0f0f0" }}
      aria-label="Interactive map of Pakistan"
    >
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-red-500/10 blur-3xl z-[1000]"></div>
      <div className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl z-[1000]"></div>

      <MapContainer
        center={[30.3753, 69.3451]}
        zoom={5}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ScaleControl position="bottomleft" />

        {locations.map((location) => (
          <Marker key={location.id} position={location.position} icon={redIcon}>
            <Popup className="custom-popup">
              <div className="p-2">
                <h3 className="text-lg font-bold text-red-700">{location.name}</h3>
                <p className="mt-2 text-gray-700">{location.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <span>{location.position[0].toFixed(4)}°N, {location.position[1].toFixed(4)}°E</span>
                </div>
                <div className="mt-2 flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full w-fit">
                  ⭐ {location.rating}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

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
