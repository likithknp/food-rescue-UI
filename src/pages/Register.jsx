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

            setFormData({
                fullName: "",
                email: "",
                mobileNumber: "",
                password: ""
            });

            navigate("/login");

        } catch (error) {
            console.error(error);

            let msg;

            if (
                error.code === "ECONNABORTED" ||
                error.message?.includes("timeout")
            ) {
                msg =
                    "Connection timed out. The server may be slow to respond. Please try again.";
            } else {
                const resp = error.response?.data;

                msg =
                    resp?.message ||
                    resp ||
                    error.message ||
                    "Registration Failed";

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
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                boxSizing: "border-box",

                /* Same background as Login and Welcome */
                backgroundImage: `
                    linear-gradient(
                        rgba(255, 255, 255, 0.35),
                        rgba(255, 255, 255, 0.35)
                    ),
                    url("/food-rescue.jpeg")
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >

            {/* Main Content */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    /* Transparent like Login */
                    background: "transparent",

                    backdropFilter: "blur(3px)",
                    WebkitBackdropFilter: "blur(3px)",

                    padding: "0",
                    borderRadius: "16px"
                }}
            >

                {/* Food Donation Image */}
                <div
                    style={{
                        width: "100px",
                        height: "100px",
                        marginBottom: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
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
                            display: "block"
                        }}
                    />
                </div>

                {/* Heading */}
                <h1
                    style={{
                        fontSize: "32px",
                        fontWeight: "700",
                        margin: "0 0 8px 0",
                        color: "#111827",
                        textAlign: "center",
                        textShadow:
                            "0 2px 5px rgba(255,255,255,0.9)"
                    }}
                >
                    Join Aahar Setu
                </h1>

                {/* Description */}
                <p
                    style={{
                        fontSize: "15px",
                        color: "#172033",
                        marginBottom: "40px",
                        fontWeight: 500,
                        textAlign: "center",
                        maxWidth: "400px",
                        lineHeight: 1.6,
                        textShadow:
                            "0 1px 4px rgba(255,255,255,0.9)"
                    }}
                >
                    Create an account and join our community in reducing
                    food waste and connecting surplus food with people
                    and communities in need.
                </p>

                {/* Form */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                >

                    <form onSubmit={handleSubmit}>

                        {/* Full Name */}
                        <div style={{ marginBottom: "20px" }}>

                            <label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#111827",
                                    display: "block",
                                    marginBottom: "8px"
                                }}
                            >
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
                                style={{
                                    padding: "12px 14px",
                                    borderRadius: "10px",
                                    fontSize: "15px",
                                    backgroundColor: "rgba(255,255,255,0.95)"
                                }}
                            />

                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: "20px" }}>

                            <label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#111827",
                                    display: "block",
                                    marginBottom: "8px"
                                }}
                            >
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
                                style={{
                                    padding: "12px 14px",
                                    borderRadius: "10px",
                                    fontSize: "15px",
                                    backgroundColor: "rgba(255,255,255,0.95)"
                                }}
                            />

                        </div>

                        {/* Mobile Number */}
                        <div style={{ marginBottom: "20px" }}>

                            <label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#111827",
                                    display: "block",
                                    marginBottom: "8px"
                                }}
                            >
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
                                style={{
                                    padding: "12px 14px",
                                    borderRadius: "10px",
                                    fontSize: "15px",
                                    backgroundColor: "rgba(255,255,255,0.95)"
                                }}
                            />

                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: "28px" }}>

                            <label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#111827",
                                    display: "block",
                                    marginBottom: "8px"
                                }}
                            >
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
                                style={{
                                    padding: "12px 14px",
                                    borderRadius: "10px",
                                    fontSize: "15px",
                                    backgroundColor: "rgba(255,255,255,0.95)"
                                }}
                            />

                        </div>

                        {/* Create Account Button */}
                        <button
                            className="btn btn-primary"
                            type="submit"
                            style={{
                                width: "100%",
                                height: "48px",
                                fontSize: "16px",
                                fontWeight: "600",
                                borderRadius: "10px",
                                border: "none",
                                backgroundColor: "#2563EB",
                                color: "white",
                                cursor: "pointer",
                                boxShadow:
                                    "0 4px 12px rgba(37, 99, 235, 0.2)",
                                transition: "all 0.25s ease"
                            }}
                            onMouseOver={(e) =>
                                (e.target.style.background = "#1D4ED8")
                            }
                            onMouseOut={(e) =>
                                (e.target.style.background = "#2563EB")
                            }
                        >
                            Create Account
                        </button>

                    </form>

                    {/* Login Link */}
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#4B5563",
                            marginTop: "8px",
                            textShadow:
                                "0 1px 3px rgba(255,255,255,0.9)"
                        }}
                    >
                        Already have an account?{" "}

                        <Link
                            to="/login"
                            style={{
                                color: "#2563EB",
                                fontWeight: "600",
                                textDecoration: "none",
                                transition: "color 0.25s ease"
                            }}
                            onMouseOver={(e) =>
                                (e.target.style.color = "#1D4ED8")
                            }
                            onMouseOut={(e) =>
                                (e.target.style.color = "#2563EB")
                            }
                        >
                            Sign In
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;