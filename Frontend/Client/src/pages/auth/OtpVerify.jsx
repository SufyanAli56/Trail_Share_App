import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const tempEmail = location.state?.email; // Email passed from Register

  const handleVerify = async () => {
    if (!otp) return setError("Please enter your OTP");
    if (!tempEmail) return setError("Email not found, please register again");

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/otp/verify", {
        email: tempEmail,
        otp,
      });

      alert("OTP Verified Successfully!");

      // ✅ Pass email via query params to SetPassword page
      navigate(`/set-password?email=${encodeURIComponent(tempEmail)}`);
    } catch (err) {
      console.error("OTP Verification Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Verify OTP</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <input
        className="border w-full p-2 mb-3"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-green-600"
        } text-white px-4 py-2 rounded w-full`}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}
