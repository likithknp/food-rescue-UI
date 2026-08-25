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
                width: "100%",
                height: "100vh",
                minHeight: "100vh",
                overflow: "hidden",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                padding: "12px 20px",
                boxSizing: "border-box",

                backgroundImage: `
                    linear-gradient(
                        rgba(255, 255, 255, 0.30),
                        rgba(255, 255, 255, 0.30)
                    ),
                    url("/food-rescue.jpeg")
                `,

                backgroundSize: "cover",

                /* Keeps hands and food bowl around center */
                backgroundPosition: "center center",

                backgroundRepeat: "no-repeat",

                position: "relative"
            }}
        >

            {/* Main Register Content */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    background: "transparent",

                    backdropFilter: "blur(2px)",
                    WebkitBackdropFilter: "blur(2px)",

                    padding: "0",
                    margin: "0",

                    boxSizing: "border-box"
                }}
            >

                {/* Food Donation Image */}
                <div
                    style={{
                        width: "76px",
                        height: "76px",

                        marginBottom: "10px",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        flexShrink: 0
                    }}
                >
                    <img
                        src="/food-donation.jpeg"
                        alt="Food donation"
                        style={{
                            width: "76px",
                            height: "76px",

                            objectFit: "cover",
                            borderRadius: "50%",

                            display: "block"
                        }}
                    />
                </div>

                {/* Heading */}
                <h1
                    style={{
                        fontSize: "30px",
                        fontWeight: "700",

                        margin: "0 0 6px 0",

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
                        fontSize: "14px",

                        color: "#172033",

                        margin: "0 0 18px 0",

                        fontWeight: 500,

                        textAlign: "center",

                        maxWidth: "400px",

                        lineHeight: 1.45,

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

                        boxSizing: "border-box"
                    }}
                >

                    <form onSubmit={handleSubmit}>

                        {/* Full Name */}
                        <div
                            style={{
                                marginBottom: "11px"
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "13px",
                                    fontWeight: "600",

                                    color: "#111827",

                                    display: "block",

                                    marginBottom: "5px",

                                    textShadow:
                                        "0 1px 3px rgba(255,255,255,0.9)"
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
                                    width: "100%",
                                    height: "42px",

                                    padding: "9px 12px",

                                    borderRadius: "9px",

                                    fontSize: "14px",

                                    backgroundColor:
                                        "rgba(255,255,255,0.94)",

                                    boxSizing: "border-box"
                                }}
                            />
                        </div>

                        {/* Email */}
                        <div
                            style={{
                                marginBottom: "11px"
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "13px",
                                    fontWeight: "600",

                                    color: "#111827",

                                    display: "block",

                                    marginBottom: "5px",

                                    textShadow:
                                        "0 1px 3px rgba(255,255,255,0.9)"
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
                                    width: "100%",
                                    height: "42px",

                                    padding: "9px 12px",

                                    borderRadius: "9px",

                                    fontSize: "14px",

                                    backgroundColor:
                                        "rgba(255,255,255,0.94)",

                                    boxSizing: "border-box"
                                }}
                            />
                        </div>

                        {/* Mobile Number */}
                        <div
                            style={{
                                marginBottom: "11px"
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "13px",
                                    fontWeight: "600",

                                    color: "#111827",

                                    display: "block",

                                    marginBottom: "5px",

                                    textShadow:
                                        "0 1px 3px rgba(255,255,255,0.9)"
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
                                    width: "100%",
                                    height: "42px",

                                    padding: "9px 12px",

                                    borderRadius: "9px",

                                    fontSize: "14px",

                                    backgroundColor:
                                        "rgba(255,255,255,0.94)",

                                    boxSizing: "border-box"
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div
                            style={{
                                marginBottom: "15px"
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "13px",
                                    fontWeight: "600",

                                    color: "#111827",

                                    display: "block",

                                    marginBottom: "5px",

                                    textShadow:
                                        "0 1px 3px rgba(255,255,255,0.9)"
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
                                    width: "100%",
                                    height: "42px",

                                    padding: "9px 12px",

                                    borderRadius: "9px",

                                    fontSize: "14px",

                                    backgroundColor:
                                        "rgba(255,255,255,0.94)",

                                    boxSizing: "border-box"
                                }}
                            />
                        </div>

                        {/* Create Account */}
                        <button
                            className="btn btn-primary"
                            type="submit"
                            style={{
                                width: "100%",
                                height: "44px",

                                fontSize: "15px",
                                fontWeight: "600",

                                borderRadius: "9px",
                                border: "none",

                                backgroundColor: "#2563EB",
                                color: "white",

                                cursor: "pointer",

                                boxShadow:
                                    "0 4px 12px rgba(37, 99, 235, 0.25)",

                                transition:
                                    "all 0.25s ease"
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

                            fontSize: "13px",

                            color: "#374151",

                            margin: "10px 0 0 0",

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

                                transition:
                                    "color 0.25s ease"
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