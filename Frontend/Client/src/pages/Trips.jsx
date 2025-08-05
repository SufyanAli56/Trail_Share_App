import { useEffect, useState } from "react";
import api from "../api/axios";
import TripCard from "../components/TripCard";

export default function Trips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api.get("/trips").then((res) => setTrips(res.data.data || []));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard key={trip._id} trip={trip} />
      ))}
    </div>
  );
}
