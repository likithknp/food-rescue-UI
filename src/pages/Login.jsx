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
            const token =
                data.token ||
                data.accessToken ||
                data.authToken ||
                data.jwt ||
                data?.data?.token ||
                data?.auth_token ||
                data?.access_token;

            if (token) {
                try {
                    setToken(token);

                    try {
                        const userInfo = {};

                        if (data.userId) userInfo.userId = data.userId;
                        if (data.email) userInfo.email = data.email;
                        if (data.fullName) userInfo.fullName = data.fullName;
                        if (data.mobileNumber) {
                            userInfo.mobileNumber = data.mobileNumber;
                        }

                        if (Object.keys(userInfo).length > 0) {
                            localStorage.setItem(
                                "user",
                                JSON.stringify(userInfo)
                            );
                        }

                        try {
                            window.dispatchEvent(new Event("auth-change"));
                        } catch (e) {
                            console.warn("Auth event failed:", e);
                        }
                    } catch (e) {
                        console.warn(
                            "Failed to persist user info from login response",
                            e
                        );
                    }
                } catch (e) {
                    console.warn("Failed to persist token", e);
                }

                navigate("/dashboard");
                return;
            }

            // Some backends return success instead of a token
            if (
                data.success === true ||
                data.success === "true"
            ) {
                try {
                    const userInfo = {
                        userId:
                            data.userId ||
                            data.userID ||
                            data?.data?.userId,
                        email: data.email,
                    };

                    localStorage.setItem(
                        "user",
                        JSON.stringify(userInfo)
                    );

                    try {
                        window.dispatchEvent(
                            new Event("auth-change")
                        );
                    } catch (e) {
                        console.warn("Auth event failed:", e);
                    }
                } catch (e) {
                    console.warn(
                        "Failed to persist user info",
                        e
                    );
                }

                navigate("/dashboard");
                return;
            }

            // No token and no success flag
            setError(
                `Login failed: no token returned. Response: ${JSON.stringify(
                    data
                )}`
            );
        } catch (err) {
            let msg =
                err?.response?.data?.message ||
                err?.response?.data ||
                err.message ||
                "Login failed";

            // Timeout/server startup
            if (
                err.code === "ECONNABORTED" ||
                err.message?.includes("timeout")
            ) {
                msg =
                    "⏳ Server is starting up. This may take 1-3 minutes. Please try again.";
            } else if (
                err.message === "Network Error" &&
                !err.response
            ) {
                msg =
                    "Network error. Please check your internet connection or try again later.";
            }

            setError(
                typeof msg === "string"
                    ? msg
                    : JSON.stringify(msg)
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                overflow: "hidden",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                padding: "15px 20px",
                boxSizing: "border-box",

                backgroundImage:
                    'linear-gradient(rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.35)), url("/food-rescue.jpeg")',

                backgroundSize: "cover",

                /*
                 * Keeps the hands and food bowl around
                 * the middle of the browser window.
                 */
                backgroundPosition: "center center",

                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Main Login Content */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",

                    /*
                     * Prevent content from creating page scroll.
                     */
                    maxHeight: "calc(100vh - 30px)",
                    overflow: "hidden",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {/* Food Donation Image */}
                <div
                    style={{
                        width: "90px",
                        height: "90px",

                        margin: "0 auto 14px",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img
                        src="/food-donation.jpeg"
                        alt="Food donation"
                        style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            display: "block",
                        }}
                    />
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: "32px",
                        fontWeight: "700",

                        margin: "0 0 6px",

                        color: "#111827",

                        textAlign: "center",

                        textShadow:
                            "0 2px 5px rgba(255,255,255,0.9)",
                    }}
                >
                    Welcome to Aahar Setu
                </h1>

                {/* Description */}
                <p
                    style={{
                        fontSize: "15px",
                        color: "#4B5563",

                        margin:
                            "0 auto 22px",

                        fontWeight: 400,

                        lineHeight: 1.5,

                        textAlign: "center",

                        maxWidth: "420px",

                        textShadow:
                            "0 1px 3px rgba(255,255,255,0.8)",
                    }}
                >
                    Sign in to connect with food donors, NGOs,
                    and volunteers working together to reduce
                    food waste.
                </p>

                {/* Email */}
                <div
                    style={{
                        marginBottom: "14px",
                    }}
                >
                    <label
                        style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#111827",

                            display: "block",

                            marginBottom: "6px",

                            textShadow:
                                "0 1px 2px rgba(255,255,255,0.8)",
                        }}
                    >
                        Email Address
                    </label>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",

                            border:
                                "1px solid #E5E7EB",

                            borderRadius: "10px",

                            padding: "10px 14px",

                            backgroundColor:
                                "rgba(255,255,255,0.95)",

                            gap: "10px",

                            transition:
                                "all 0.25s ease",

                            height: "48px",

                            boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor =
                                "#2563EB";

                            e.currentTarget.style.boxShadow =
                                "0 0 0 3px rgba(37, 99, 235, 0.1)";
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor =
                                "#E5E7EB";

                            e.currentTarget.style.boxShadow =
                                "none";
                        }}
                    >
                        {/* Email Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />

                            <polyline points="22,6 12,13 2,6" />
                        </svg>

                        <input
                            type="email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            style={{
                                border: "none",
                                outline: "none",

                                fontSize: "15px",

                                width: "100%",

                                color: "#111827",

                                backgroundColor:
                                    "transparent",
                            }}
                        />
                    </div>
                </div>

                {/* Password */}
                <div
                    style={{
                        marginBottom: "12px",
                    }}
                >
                    <label
                        style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#111827",

                            display: "block",

                            marginBottom: "6px",

                            textShadow:
                                "0 1px 2px rgba(255,255,255,0.8)",
                        }}
                    >
                        Password
                    </label>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",

                            border:
                                "1px solid #E5E7EB",

                            borderRadius: "10px",

                            padding: "10px 14px",

                            backgroundColor:
                                "rgba(255,255,255,0.95)",

                            gap: "10px",

                            transition:
                                "all 0.25s ease",

                            height: "48px",

                            boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor =
                                "#2563EB";

                            e.currentTarget.style.boxShadow =
                                "0 0 0 3px rgba(37, 99, 235, 0.1)";
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor =
                                "#E5E7EB";

                            e.currentTarget.style.boxShadow =
                                "none";
                        }}
                    >
                        {/* Lock Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="3"
                                y="11"
                                width="18"
                                height="11"
                                rx="2"
                                ry="2"
                            />

                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="••••••••"
                            style={{
                                border: "none",
                                outline: "none",

                                fontSize: "15px",

                                width: "100%",

                                color: "#111827",

                                backgroundColor:
                                    "transparent",
                            }}
                        />

                        {/* Show / Hide Password */}
                        <span
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            style={{
                                cursor: "pointer",
                                display: "flex",
                            }}
                        >
              {showPassword ? (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6B7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />

                      <circle
                          cx="12"
                          cy="12"
                          r="3"
                      />
                  </svg>
              ) : (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6B7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />

                      <line
                          x1="1"
                          y1="1"
                          x2="23"
                          y2="23"
                      />
                  </svg>
              )}
            </span>
                    </div>
                </div>

                {/* Forgot Password */}
                <div
                    style={{
                        textAlign: "right",
                        marginBottom: "14px",
                    }}
                >
          <span
              style={{
                  color: "#2563EB",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: "500",
              }}
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

                        backgroundColor:
                            loading
                                ? "#9CA3AF"
                                : "#2563EB",

                        color: "white",

                        border: "none",

                        borderRadius: "10px",

                        fontSize: "16px",

                        fontWeight: "600",

                        cursor: loading
                            ? "not-allowed"
                            : "pointer",

                        width: "100%",

                        height: "48px",

                        transition:
                            "all 0.25s ease",

                        boxShadow: loading
                            ? "none"
                            : "0 4px 12px rgba(37,99,235,0.2)",
                    }}
                    onMouseOver={(e) => {
                        if (!loading) {
                            e.currentTarget.style.backgroundColor =
                                "#1D4ED8";
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!loading) {
                            e.currentTarget.style.backgroundColor =
                                "#2563EB";
                        }
                    }}
                >
                    {loading
                        ? "Signing in..."
                        : "Sign In"}
                </button>

                {/* Loading Message */}
                {loading && (
                    <div
                        style={{
                            color: "#2563EB",

                            backgroundColor:
                                "rgba(37,99,235,0.08)",

                            marginTop: "8px",

                            textAlign: "center",

                            padding: "8px",

                            borderRadius: "8px",

                            fontSize: "12px",

                            fontWeight: 500,
                        }}
                    >
                        ⏳ Server may be starting up.
                        This can take 1-3 minutes...
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div
                        style={{
                            color: "#EF4444",

                            backgroundColor:
                                "rgba(239,68,68,0.08)",

                            marginTop: "8px",

                            textAlign: "center",

                            padding: "8px",

                            borderRadius: "8px",

                            fontSize: "13px",

                            fontWeight: 500,
                        }}
                    >
                        ⚠️ {error}
                    </div>
                )}

                {/* Register Link */}
                <p
                    style={{
                        textAlign: "center",

                        fontSize: "14px",

                        color: "#4B5563",

                        marginTop: "12px",

                        marginBottom: "0",

                        textShadow:
                            "0 1px 2px rgba(255,255,255,0.8)",
                    }}
                >
                    Don't have an account?{" "}
                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                        style={{
                            color: "#2563EB",

                            fontWeight: "600",

                            cursor: "pointer",

                            transition:
                                "color 0.25s ease",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.color =
                                "#1D4ED8")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.color =
                                "#2563EB")
                        }
                    >
            Create one
          </span>
                </p>
            </div>
        </div>
    );
}

export default Login;