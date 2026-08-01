import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await registerUser(formData);

            alert("Registration Successful");
            navigate("/login");
            setFormData({
                fullName: "",
                email: "",
                mobileNumber: "",
                password: ""
            });

        } catch (error) {

            console.error(error);

            // Provide more helpful message for timeout errors
            let msg;
            if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
                msg = "Connection timed out. The server may be slow to respond. Please try again.";
            } else {
                // Prefer server message, fall back to whole response or error message
                const resp = error.response?.data;
                msg = resp?.message || resp || error.message || "Registration Failed";
                if (typeof msg === "object") {
                    try {
                        msg = JSON.stringify(msg);
                    } catch {
                        msg = String(msg);
                    }
                }
            }
            alert(msg);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F8FAFC",
            padding: "20px",
            boxSizing: "border-box",
        }}>

            {/* Brand Circle */}
            <div
                style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "24px",
                    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.3)"
                }}
            >
                <span style={{ fontSize: '40px', fontWeight: 'bold' }}>🍽️</span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: "#111827", textAlign: 'center' }}>
                Join FoodBridge
            </h1>
            <p style={{ fontSize: "15px", color: "#6B7280", marginBottom: "40px", fontWeight: 400, textAlign: 'center', maxWidth: '400px' }}>
                Create an account and start reducing food waste while helping your community
            </p>

            {/* Form */}
            <div style={{ width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", gap: "20px" }}>

                <form onSubmit={handleSubmit}>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#111827", display: "block", marginBottom: "8px" }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            placeholder="Your full name"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    fullName: e.target.value
                                })
                            }
                            required
                            style={{ padding: "12px 14px", borderRadius: "10px", fontSize: "15px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#111827", display: "block", marginBottom: "8px" }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            autoComplete="off"
                            className="form-control"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            }
                            required
                            style={{ padding: "12px 14px", borderRadius: "10px", fontSize: "15px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#111827", display: "block", marginBottom: "8px" }}>
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            placeholder="+91 9876543210"
                            value={formData.mobileNumber}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    mobileNumber: e.target.value
                                })
                            }
                            required
                            style={{ padding: "12px 14px", borderRadius: "10px", fontSize: "15px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "28px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#111827", display: "block", marginBottom: "8px" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            className="form-control"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value
                                })
                            }
                            required
                            style={{ padding: "12px 14px", borderRadius: "10px", fontSize: "15px" }}
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        type="submit"
                        style={{
                            width: "100%",
                            height: "48px",
                            fontSize: "16px",
                            fontWeight: "600",
                            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)"
                        }}
                    >
                        Create Account
                    </button>

                </form>

                <p style={{ textAlign: "center", fontSize: "14px", color: "#6B7280", marginTop: "8px" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{
                        color: "#2563EB",
                        fontWeight: "600",
                        textDecoration: "none",
                        transition: "color 0.25s ease"
                    }}
                    onMouseOver={(e) => e.target.style.color = '#1D4ED8'}
                    onMouseOut={(e) => e.target.style.color = '#2563EB'}
                    >
                        Sign In
                    </Link>
                </p>


            </div>

        </div>
    );
}

export default Register;