import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function OtpVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!otp) return setError("Enter OTP first");
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/otp/verify", { email, otp });
      if (res.data.success) {
        alert("OTP Verified!");
        navigate(`/set-password?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Verify OTP</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full py-3 text-white font-medium rounded-lg transition-all duration-300 relative overflow-hidden disabled:opacity-60"
        style={{
          background: 'linear-gradient(90deg, #ff4d4d 0%, #b30000 100%)',
          boxShadow: '0 4px 15px rgba(255, 77, 77, 0.4)',
        }}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}
