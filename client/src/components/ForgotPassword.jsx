import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ForgotPassword component for resetting password
const ForgotPassword = () => {
  // State variables for email, new password, and messages
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission for password reset
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email and new password to backend
    axios
      .post("http://localhost:3001/forgot-password", { email, newPassword })
      .then((res) => {
        if (res.data.status === "ok") {
          setMessage("Password updated successfully!");
          setTimeout(() => navigate("/login"), 2000); // Redirect after success
        } else {
          setMessage(res.data.message || "Failed to reset password.");
        }
      })
      .catch(() => setMessage("Error resetting password."));
  };

  // Render forgot password form
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          {/* Display message if any */}
          {message && <div className="alert alert-info">{message}</div>}

          {/* Email input field */}
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter your registered email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* New password input field */}
          <div className="mb-3">
            <label><strong>New Password</strong></label>
            <input
              type="password"
              placeholder="Enter new password"
              className="form-control rounded-0"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-100 rounded-0">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;