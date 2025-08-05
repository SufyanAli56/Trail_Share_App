import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    api.get("/bookmarks").then((res) => setBookmarks(res.data.data || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>
      {bookmarks.length === 0 && <p>No bookmarks yet.</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookmarks.map((bm) => (
          <div key={bm._id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{bm.trip?.name}</h2>
            <p>{bm.trip?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
