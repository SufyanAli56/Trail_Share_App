import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        email: email.trim(),
        password,
      };
      console.log("🔹 Sending login:", payload);

      const res = await api.post("/auth/login", payload);

      if (res.data.success) {
        // ✅ Save token & user in Zustand
        login({
          token: res.data.token,
          user: res.data.user,
        });

        navigate("/"); // Redirect to home/dashboard
      } else {
        setError(res.data.message || res.data.error || "Login failed");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="border w-full p-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          type="password"
          className="border w-full p-2 mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
