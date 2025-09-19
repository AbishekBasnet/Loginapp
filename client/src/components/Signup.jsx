import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ added useNavigate
import axios from 'axios';
import './Signup.css';

// Signup component
const Signup = () => {
  // State variables for form fields and error message
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  // Email validation function (stricter regex)
  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  // Password validation function
  // At least one capital, one number, one special char, min 8 chars
  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password);
  };

  // Phone number validation function (10 digits only)
  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Validate password
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters, contain one capital letter, one number, and one special character.');
      return;
    }
    // Validate phone number
    if (!validatePhone(phone)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    // Send registration data to backend
    axios.post("http://localhost:3001/register", {
      name,
      email,
      password,
      phone
    })
    .then(res => {
      // If registration is successful and token is received
      if (res.data.status === "ok" && res.data.token) {
        alert("Registration successful!");
        localStorage.setItem('token', res.data.token); // Store JWT
        navigate("/");
      } else {
        setError(res.data.message || "Registration failed.");
      }
    })
    .catch(err => {
      setError("❌ Registration failed.");
      console.error("❌ Registration failed:", err);
    });
  };

  // Render registration form
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Display error message if any */}
          {error && <div className="alert alert-danger">{error}</div>}
          
          {/* Name input field */}
          <div className="mb-3">
            <label><strong>Name</strong></label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email input field */}
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input field */}
          <div className="mb-3">
            <label><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Phone number input field */}
          <div className="mb-3">
            <label><strong>Phone Number</strong></label>
            <input
              type="text"
              placeholder="Enter 10-digit Phone Number"
              className="form-control rounded-0"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/, ''))}
              maxLength={10}
            />
          </div>

          {/* Register button */}
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          
          {/* Cancel button to clear form */}
          <button
            type="button"
            className="btn btn-danger w-100 rounded-0 mt-2"
            onClick={() => {
              setName("");
              setEmail("");
              setPassword("");
              setPhone("");
            }}
          >
            Cancel
          </button>
        </form>

        {/* Link to login page */}
        <p className="mt-2">Already Have an Account?</p>
        <Link to="/login" className="btn btn-light border w-100 rounded-0 text-center">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
