import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import axios from "axios";

function OtpVerification({ isOtpSubmitted, setIsOtpSubmitted, email }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    setIsOtpSubmitted(true);
  };

  const handleResendOtp = (e) => {
    const data = axios
      .post("http://localhost:8000/api/auth/resendotp", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!isOtpSubmitted) return;
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/verifyotp",
          { email: email, otp: otp }
        );
        console.log(res.data);
        navigate("/");
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      } finally {
        setOtp("");
      }
    };
    fetchData();
  }, [isOtpSubmitted]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          OTP Verification
        </h2>
        <form onSubmit={handleSubmitOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Verify
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Didn't receive the OTP?
        </p>
        <button
          onClick={handleResendOtp}
          className="w-full py-2 mt-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

OtpVerification.propTypes = {
  isOtpSubmitted: PropTypes.bool.isRequired,
  setIsOtpSubmitted: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default OtpVerification;
