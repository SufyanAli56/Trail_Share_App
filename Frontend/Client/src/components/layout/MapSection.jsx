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

// Define locations for dynamic markers
const locations = [
  {
    id: 1,
    position: [36.3167, 74.65],
    name: "Hunza Valley",
    description: "A beautiful place in Gilgit-Baltistan, known for its stunning landscapes.",
  },
  {
    id: 2,
    position: [33.6844, 73.0479],
    name: "Islamabad",
    description: "The capital city of Pakistan, known for its greenery and urban planning.",
  },
];

export default function MapSection() {
  // State to ensure client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set to true after component mounts
  }, []);

  // Prevent rendering until mounted to avoid SSR issues
  if (!isMounted) return null;

  return (
    <section
      style={{
        height: "80vh",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f0f0f0",
      }}
      aria-label="Interactive map of Pakistan"
    >
      <MapContainer
        center={[30.3753, 69.3451]} // Pakistan center
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        {/* CartoDB Tiles for a clean look */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Scale Control */}
        <ScaleControl position="bottomleft" />

        {/* Dynamic Markers */}
        {locations.map((location) => (
          <Marker key={location.id} position={location.position}>
            <Popup>
              <strong>{location.name}</strong>
              <br />
              {location.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}pp