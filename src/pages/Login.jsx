import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0faf0",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Green heart circle */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#16a34a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="white"
          stroke="white"
          strokeWidth="1"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 6px 0", color: "#111" }}>
        Welcome Back
      </h1>
      <p style={{ fontSize: "15px", color: "#666", marginBottom: "30px" }}>
        Login to continue sharing food
      </p>

      {/* Form */}
      <div style={{ width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Email */}
        <div>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#222", display: "block", marginBottom: "6px" }}>
            Email
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "12px 14px",
              backgroundColor: "white",
              gap: "10px",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                border: "none",
                outline: "none",
                fontSize: "15px",
                width: "100%",
                color: "#333",
                backgroundColor: "transparent",
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#222", display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "12px 14px",
              backgroundColor: "white",
              gap: "10px",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              style={{
                border: "none",
                outline: "none",
                fontSize: "15px",
                width: "100%",
                color: "#333",
                backgroundColor: "transparent",
              }}
            />
            <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </div>
        </div>

        {/* Forgot Password */}
        <div style={{ textAlign: "right", marginTop: "-8px" }}>
          <span style={{ color: "#16a34a", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}>
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "14px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Login
        </button>

        {/* Sign Up link */}
        <p style={{ textAlign: "center", fontSize: "14px", color: "#555" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#16a34a", fontWeight: "600", cursor: "pointer" }}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;