import { useAuthStore } from "../store/useAuthStore";
import api from "../api/axios";

export default function TripCard({ trip }) {
  const token = useAuthStore((state) => state.token);

  const addBookmark = async () => {
    if (!token) return alert("Please login to bookmark trips");
    await api.post(`/bookmarks/trips/${trip._id}`);
    alert("Trip bookmarked!");
  };

  return (
    <div className="border rounded-lg shadow p-4">
      <img
        src={trip.images?.[0] || "https://via.placeholder.com/200"}
        alt={trip.name}
        className="rounded-md mb-3 w-full h-40 object-cover"
      />
      <h2 className="text-lg font-bold">{trip.name}</h2>
      <p className="text-gray-600">{trip.description}</p>
      <button
        onClick={addBookmark}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Bookmark
      </button>
    </div>
  );
}
