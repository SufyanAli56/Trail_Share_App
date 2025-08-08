import { useEffect, useState } from "react";
import api from "../api/axios";
import TripCard from "../components/TripCard";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/trips")
      .then((res) => {
        console.log("API Response:", res.data);

        // Adjust based on your API response shape
        const fetchedTrips = res.data.data || res.data.trips || [];
        setTrips(fetchedTrips);
      })
      .catch((err) => {
        console.error("Error fetching trips:", err);
        setError("Failed to load trips. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading trips...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {trips.length > 0 ? (
        trips.map((trip) => (
          <TripCard key={trip._id || trip.id} trip={trip} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">
          No trips available.
        </p>
      )}
    </div>
  );
}
