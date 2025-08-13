import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaRegBookmark, FaBookmark } from "react-icons/fa"; // icons

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [comments, setComments] = useState({}); // { tripId: [comments] }
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch trips + comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trips
        const tripsRes = await api.get("/trips");
        const tripsData = tripsRes.data?.data || [];
        setTrips(tripsData);

        // Fetch bookmarks if logged in
        if (token) {
          const bookmarksRes = await api.get("/bookmarks", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBookmarks(bookmarksRes.data?.data || []);
        }

        // Fetch comments for each trip
        const commentsData = {};
        for (const trip of tripsData) {
          const cRes = await api.get(`/comments?tripId=${trip._id}`);
          commentsData[trip._id] = cRes.data?.data || [];
        }
        setComments(commentsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load trips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Refresh comments for a specific trip
  const refreshComments = async (tripId) => {
    try {
      const res = await api.get(`/comments?tripId=${tripId}`);
      setComments((prev) => ({
        ...prev,
        [tripId]: res.data?.data || [],
      }));
    } catch (err) {
      console.error("Error refreshing comments:", err);
    }
  };

  // Handle adding a new comment
  const handleAddComment = async (tripId) => {
    if (!token) {
      alert("You must be logged in to add a comment.");
      return;
    }

    const text = newComment[tripId]?.trim();
    if (!text) return;

    try {
      await api.post(
        "/comments",
        { trip: tripId, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh comments after saving
      refreshComments(tripId);

      // Clear input
      setNewComment((prev) => ({ ...prev, [tripId]: "" }));
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // Bookmarks helper functions
  const refreshBookmarks = async () => {
    if (!token) return;
    const res = await api.get("/bookmarks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookmarks(res.data?.data || []);
  };

  const handleAddBookmark = async (tripId) => {
    if (!token) return alert("You must be logged in to bookmark trips.");
    await api.post(`/bookmarks/trips/${tripId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    refreshBookmarks();
  };

  const handleRemoveBookmark = async (bookmarkId) => {
    if (!token) return;
    await api.delete(`/bookmarks/${bookmarkId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    refreshBookmarks();
  };

  const isBookmarked = (tripId) =>
    bookmarks.some((b) => b.trip._id === tripId);

  const getBookmarkId = (tripId) =>
    bookmarks.find((b) => b.trip._id === tripId)?._id;

  // Loading & error states
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading trips...</div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  // Main render
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {trips.length > 0 ? (
        trips.map((trip) => {
          const imageUrl = trip.images?.[0]?.url || "/placeholder.jpg";
          const bookmarked = isBookmarked(trip._id);
          const tripComments = comments[trip._id] || [];

          return (
            <div
              key={trip._id}
              className="border rounded-lg overflow-hidden shadow relative"
            >
              <img
                src={imageUrl}
                alt={trip.title}
                className="w-full h-48 object-cover"
              />

              {/* Bookmark button */}
              {token && (
                <button
                  onClick={() =>
                    bookmarked
                      ? handleRemoveBookmark(getBookmarkId(trip._id))
                      : handleAddBookmark(trip._id)
                  }
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                  title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                >
                  {bookmarked ? (
                    <FaBookmark className="text-yellow-500 text-xl" />
                  ) : (
                    <FaRegBookmark className="text-gray-600 text-xl" />
                  )}
                </button>
              )}

              <div className="p-4">
                <h2 className="text-lg font-bold">{trip.title}</h2>
                <p className="text-gray-600">{trip.description}</p>
                {trip.price && (
                  <p className="text-gray-800 font-semibold">${trip.price}</p>
                )}

                {/* Comments section */}
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800">Comments</h3>
                  <div className="space-y-2 mt-2">
                    {tripComments.length > 0 ? (
                      tripComments.map((c) => (
                        <div
                          key={c._id}
                          className="p-2 bg-gray-100 rounded text-sm"
                        >
                          <strong>{c.user?.name || "User"}:</strong> {c.text}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No comments yet.
                      </p>
                    )}
                  </div>

                  {/* Add comment form */}
                  {token && (
                    <div className="flex mt-3">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="flex-1 border rounded-l px-2 py-1 text-sm"
                        value={newComment[trip._id] || ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({
                            ...prev,
                            [trip._id]: e.target.value,
                          }))
                        }
                      />
                      <button
                        onClick={() => handleAddComment(trip._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-r text-sm hover:bg-blue-600"
                      >
                        Post
                      </button>
                    </div>
                  )}
                </div>
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
