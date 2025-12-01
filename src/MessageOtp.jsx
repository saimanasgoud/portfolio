import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

function Message() {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [serverOtp, setServerOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");

  const [otpExpiresAt, setOtpExpiresAt] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const [closed, setClosed] = useState(false);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const startCooldown = () => {
    setCooldown(30); // user must wait 30 seconds to resend
  };

  const sendOtp = () => {
    if (!tempName || !tempEmail) {
      setStatusMessage("Please enter name and email");
      setStatusType("error");
      return;
    }

    const newOtp = generateOtp();
    setServerOtp(newOtp);

    setOtpSent(true);
    setOtpExpiresAt(Date.now() + 3 * 60 * 1000); // expires in 3 minutes
    startCooldown();

    const templateParams = {
      user_name: tempName,
      user_email: tempEmail,
      otp: newOtp,
    };

    emailjs
      .send(
        "service_ol9mscn",     // your service id
        "template_rq3pbl4",    // your template id
        templateParams,
        "sJD5jexP_JXmI95ma"    // your public key
      )
      .then(() => {
        setStatusMessage("OTP sent to your email!");
        setStatusType("success");
      })
      .catch(() => {
        setStatusMessage("Failed to send OTP");
        setStatusType("error");
      });
  };

  const verifyOtp = () => {
    if (Date.now() > otpExpiresAt) {
      setStatusMessage("OTP expired. Please request a new one.");
      setStatusType("error");
      return;
    }

    if (enteredOtp === serverOtp) {
      setStatusMessage("OTP verified!");
      setStatusType("success");
      setVerified(true); // mark OTP as verified
    } else {
      setStatusMessage("Invalid OTP");
      setStatusType("error");
    }
  };

  const resendOtp = () => {
    if (cooldown > 0) return;
    sendOtp();
  };

  // Cooldown timer countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <div className="mb-4">
        <label className="flex items-center gap-3 mb-3">
          <span className="w-10 text-orange-500 font-medium">Name</span>
          <input
            type="text"
            value={tempName}
            placeholder="enter name"
            onChange={(e) => setTempName(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
        </label>

        <label className="flex items-center gap-3">
          <span className="w-10 text-orange-500 font-medium">Email</span>
          <input
            type="email"
            value={tempEmail}
            placeholder="enter mail"
            onChange={(e) => setTempEmail(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
        </label>
      </div>

      {!otpSent && (
        <button
          onClick={sendOtp}
          className="bg-yellow-300 cursor-pointer px-4 py-2 rounded"
          style={{ marginBottom: "10px" }}
        >
          Get OTP
        </button>
      )}

      {statusMessage && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            borderRadius: "5px",
            background: statusType === "error" ? "#fee2e2" : "#d1fae5",
            color: statusType === "error" ? "#b91c1c" : "#065f46",
            textAlign: "center",
          }}
        >
          {statusMessage}
        </div>
      )}

      {otpSent && !verified && (
        <div style={{ marginBottom: "20px" }} className="mt-10">
          {/* OTP Boxes */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1px",
              marginBottom: "10px",
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={enteredOtp[i] || ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/, ""); // only digits
                  let newOtp = enteredOtp.split("");
                  newOtp[i] = val;
                  setEnteredOtp(newOtp.join(""));
                  // auto focus next box
                  if (val && i < 5) {
                    const nextInput = document.getElementById(`otp-${i + 1}`);
                    nextInput && nextInput.focus();
                  }
                }}
                id={`otp-${i}`}
                style={{
                  width: "40px",
                  height: "50px",
                  fontSize: "24px",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
              />
            ))}
          </div>

          {/* Verify OTP Button */}
          <button
            onClick={verifyOtp}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "6px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Verify OTP
          </button>

          {/* Resend OTP */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={resendOtp}
              disabled={cooldown > 0}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: cooldown > 0 ? "not-allowed" : "pointer",
                opacity: cooldown > 0 ? 0.5 : 1,
                textDecoration: "underline",
              }}
            >
              Resend OTP
            </button>
            {cooldown > 0 && (
              <div style={{ color: "gray" }}>Wait {cooldown}s</div>
            )}
          </div>

          <div
            style={{ marginTop: "8px", color: "gray", textAlign: "center" }}
          >
            OTP expires in 3 minutes
          </div>
        </div>
      )}

      {/* Continue Button after OTP verification */}

      {verified && (

        <button
          onClick={() => navigate("/messageboard")}
          style={{
            width: "50%",
            padding: "10px",
            backgroundColor: "#10b981",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Continue
        </button>
      )}



    </div>
  );
}

export default Message;
