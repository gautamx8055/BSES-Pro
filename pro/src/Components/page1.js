import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSectionVisible, setOtpSectionVisible] = useState(false);
  const [debugOtp, setDebugOtp] = useState(""); // Only for development

  const navigate = useNavigate();

  const sendOTP = async () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSectionVisible(true);
        setDebugOtp(data.otp); // Show OTP in UI for dev only
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      alert("Error sending OTP");
      console.error(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber: mobile,
          userEnteredOtp: otp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("OTP verified successfully!");
        navigate("/request");
      } else {
        alert(data.message || "Invalid OTP");
        // Option 1: Reload the page
        // window.location.reload();

        // Option 2: Reset state for smoother UX
        setOtp(""); // Reset OTP input
        setOtpSectionVisible(false); // Hide OTP section
      }
    } catch (error) {
      alert("Error verifying OTP");
      console.error(error);
      // Option 1: Reload the page
      // window.location.reload();

      // Option 2: Reset state for smoother UX
      setOtp(""); // Reset OTP input
      setOtpSectionVisible(false); // Hide OTP section
    }
  };

  return (
    <div style={styles.container}>
      <h2>Mobile OTP Verification</h2>
      <input
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter mobile number"
        style={styles.input}
      />
      <button onClick={sendOTP} style={styles.button}>
        Send OTP
      </button>

      {otpSectionVisible && (
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            style={styles.input}
          />
          <button onClick={verifyOTP} style={styles.button}>
            Verify OTP
          </button>

          {/* Show OTP (for development only) */}
          <div style={styles.otpDisplay}>Your OTP is: {debugOtp}</div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "400px",
    margin: "50px auto",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    margin: "10px 0",
    fontSize: "1rem",
  },
  button: {
    width: "50%",
    padding: "0.6rem",
    backgroundColor: "#f23f1f",
    color: "white",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  otpDisplay: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "rgb(0, 61, 29)",
  },
};

export default OTPVerification;