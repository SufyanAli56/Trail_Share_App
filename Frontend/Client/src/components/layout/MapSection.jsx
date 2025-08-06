"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

export default function MapSection() {
  return (
    <div style={{ height: "500px", width: "100%", borderRadius: "8px" }}>
      <MapContainer
        center={[30.3753, 69.3451]} // Pakistan center
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        {/* OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Example Marker */}
        <Marker position={[36.3167, 74.65]}>
          <Popup>
            Hunza Valley <br /> A beautiful place in Gilgit-Baltistan.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
