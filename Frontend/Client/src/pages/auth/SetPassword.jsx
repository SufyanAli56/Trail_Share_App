import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get email from query params
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent page reload

    if (!email) {
      setError("Missing email. Please restart verification process.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/set-password", {
        email,
        password,
      });

      if (res.data.success) {
        alert("Password set successfully! Please log in.");
        navigate("/login");
      } else {
        setError(res.data.error || "Failed to set password");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to set password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Set Your Password</h1>

      {/* ✅ Wrap input in a form to avoid the DOM warning */}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="border w-full p-2 mb-3"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="bg-purple-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Password"}
        </button>
      </form>
    </div>
  );
}
