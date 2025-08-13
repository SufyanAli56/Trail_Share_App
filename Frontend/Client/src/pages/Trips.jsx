import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get("/trips");
        console.log("API Response:", res.data);

        // Get trips array safely
        const fetchedTrips = res.data?.data || [];
        setTrips(fetchedTrips);
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError("Failed to load trips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading trips...</div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">{error}</div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {trips.length > 0 ? (
        trips.map((trip) => {
          const imageUrl = trip.images?.[0]?.url || "/placeholder.jpg";

          return (
            <div
              key={trip._id}
              className="border rounded-lg overflow-hidden shadow"
            >
              <img
                src={imageUrl}
                alt={trip.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{trip.title}</h2>
                <p className="text-gray-600">{trip.description}</p>
                {trip.price && (
                  <p className="text-gray-800 font-semibold">${trip.price}</p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center col-span-full text-gray-500">
          No trips available.
        </p>
      )}
    </div>
  );
}
