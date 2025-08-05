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
        // Redirect to set password with email in URL
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
      <h1 className="text-xl font-bold mb-4">Verify OTP</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        className="border w-full p-2 mb-3"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}
