import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { setToken } from "../utils/tokenUtil";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      console.log("Login response:", res.data);
      const data = res.data || {};

      // Support common token field names from backend
      const token = data.token || data.accessToken || data.authToken || data.jwt || data?.data?.token || data?.auth_token || data?.access_token;

      if (token) {
        // store token and navigate
        try {
          setToken(token);
          // also persist minimal user info if returned so Profile and Navbar can display details
          try {
            const userInfo = {};
            if (data.userId) userInfo.userId = data.userId;
            if (data.email) userInfo.email = data.email;
            if (data.fullName) userInfo.fullName = data.fullName;
            if (data.mobileNumber) userInfo.mobileNumber = data.mobileNumber;
            if (Object.keys(userInfo).length > 0) {
              localStorage.setItem('user', JSON.stringify(userInfo));
            }
            // notify other components in same tab that auth changed
            try { window.dispatchEvent(new Event('auth-change')); } catch(e){}
          } catch (e) {
            console.warn('Failed to persist user info from login response', e);
          }
        } catch (e) {
          console.warn('Failed to persist token', e);
        }
        navigate("/dashboard");
        return;
      }

      // Some backends (this project) return a success flag and user info instead of a token
      // Treat that as a successful login as well
      if (data.success === true || data.success === 'true') {
        try {
          const userInfo = { userId: data.userId || data.userID || data?.data?.userId, email: data.email };
          localStorage.setItem('user', JSON.stringify(userInfo));
          try { window.dispatchEvent(new Event('auth-change')); } catch(e){}
        } catch (e) {
          console.warn('Failed to persist user info', e);
        }
        navigate("/dashboard");
        return;
      }

      // No token and no success flag -> treat as error
      setError(`Login failed: no token returned. Response: ${JSON.stringify(data)}`);
    } catch (err) {
      // try to extract useful message
      let msg = err?.response?.data?.message || err?.response?.data || err.message || "Login failed";

      // Provide more helpful message for timeout/server startup errors
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        msg = "⏳ Server is starting up. This may take 1-3 minutes. Please try again.";
      } else if (err.message === 'Network Error' && !err.response) {
        msg = "Network error. Please check your internet connection or try again later.";
      }

      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      // Ensure loading state is always cleared so button doesn't stay stuck
      setLoading(false);
    }
  };

  return (
      <div
          style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box",

              backgroundImage:
                  'linear-gradient(rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.35)), url("/food-rescue.jpeg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
          }}
      >
      {/* Brand Circle */}
        <div
            style={{
                width: "100px",
                height: "100px",
                marginBottom: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
      >
            <img
                src="/food-donation.jpeg"
                alt="Food donation"
                style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    display: "block",
                }}
        />
      </div>

      {/* Title */}
      <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: "#111827" }}>
        Welcome to Aahar Setu
      </h1>
      <p style={{ fontSize: "15px", color: "#6B7280", marginBottom: "40px", fontWeight: 400 }}>
        Sign in to connect with food donors, NGOs, and volunteers
        working together to reduce food waste.
      </p>

      {/* Form */}
      <div style={{ width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Email */}
        <div>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#111827", display: "block", marginBottom: "8px" }}>
            Email Address
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
              padding: "12px 14px",
              backgroundColor: "white",
              gap: "10px",
              transition: "all 0.25s ease"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#2563EB';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <input
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                border: "none",
                outline: "none",
                fontSize: "15px",
                width: "100%",
                color: "#111827",
                backgroundColor: "transparent",
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#111827", display: "block", marginBottom: "8px" }}>
            Password
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
              padding: "12px 14px",
              backgroundColor: "white",
              gap: "10px",
              transition: "all 0.25s ease"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#2563EB';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                border: "none",
                outline: "none",
                fontSize: "15px",
                width: "100%",
                color: "#111827",
                backgroundColor: "transparent",
              }}
            />
            <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer", display: 'flex' }}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </span>
          </div>
        </div>

        {/* Forgot Password */}
        <div style={{ textAlign: "right" }}>
          <span style={{ color: "#2563EB", fontSize: "14px", cursor: "pointer", fontWeight: "500", transition: "color 0.25s ease" }}
            onMouseOver={(e) => e.target.style.color = '#1D4ED8'}
            onMouseOut={(e) => e.target.style.color = '#2563EB'}
          >
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            padding: "12px 20px",
            backgroundColor: loading ? "#9CA3AF" : "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
            height: "48px",
            transition: "all 0.25s ease",
            boxShadow: loading ? "none" : "0 4px 12px rgba(37, 99, 235, 0.2)"
          }}
          onMouseOver={(e) => !loading && (e.target.style.background = "#1D4ED8")}
          onMouseOut={(e) => !loading && (e.target.style.background = "#2563EB")}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {loading && (
          <div style={{ color: "#2563EB", backgroundColor: "rgba(37, 99, 235, 0.08)", marginTop: "8px", textAlign: "center", padding: "12px", borderRadius: "8px", fontSize: '13px', fontWeight: 500 }}>
            ⏳ Server may be starting up. This can take 1-3 minutes...
          </div>
        )}

        {error && (
          <div style={{ color: "#EF4444", backgroundColor: "rgba(239, 68, 68, 0.08)", marginTop: "8px", textAlign: "center", padding: "12px", borderRadius: "8px", fontSize: '14px', fontWeight: 500 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Sign Up link */}
        <p style={{ textAlign: "center", fontSize: "14px", color: "#6B7280", marginTop: "8px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#2563EB", fontWeight: "600", cursor: "pointer", transition: "color 0.25s ease" }}
            onMouseOver={(e) => e.target.style.color = '#1D4ED8'}
            onMouseOut={(e) => e.target.style.color = '#2563EB'}
          >
            Create one
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;