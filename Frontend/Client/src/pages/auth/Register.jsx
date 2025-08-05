import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email });
      navigate("/otp-verify", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        className="border w-full p-2 mb-3"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-3"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}
