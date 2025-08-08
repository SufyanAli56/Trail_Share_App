import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get("email");

    if (emailFromUrl) {
      setEmail(emailFromUrl);
    } else {
      setError("Invalid password reset link. Email is missing.");
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/set-password", { email, password });

      if (res.data.success) {
        alert("✅ Password set successfully! Please log in.");
        navigate("/login");
      } else {
        setError(res.data.error || "Failed to set password");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to set password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f5f2] via-[#f2e8e5] to-[#f8f5f2] px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Set Your Password
        </h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            value={email}
            readOnly
          />

          <input
            type="password"
            name="new-password"
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
            style={{
              background: "linear-gradient(to right, #ff4d4d, #b30000)",
              boxShadow: "0 4px 15px rgba(255, 77, 77, 0.4)",
            }}
          >
            {loading ? "Saving..." : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
