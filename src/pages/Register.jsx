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
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
                boxSizing: "border-box",

                backgroundImage: `
                    linear-gradient(
                        rgba(255, 255, 255, 0.35),
                        rgba(255, 255, 255, 0.35)
                    ),
                    url("/food-rescue.jpeg")
                `,

                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

                textAlign: "center"
            }}
        >

            {/* Main Content */}
            <div
                style={{
                    maxWidth: "920px",
                    width: "100%",
                    padding: "35px 40px",

                    borderRadius: "16px",

                    background: "rgba(255, 255, 255, 0.20)",

                    backdropFilter: "blur(3px)",
                    WebkitBackdropFilter: "blur(3px)",

                    border: "1px solid rgba(255, 255, 255, 0.40)",

                    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",

                    color: "#111827"
                }}
            >

                {/* Food Donation Image */}
                <div
                    style={{
                        width: "90px",
                        height: "90px",
                        margin: "0 auto 20px",

                        borderRadius: "50%",
                        overflow: "hidden",

                        position: "relative",

                        background: "transparent",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.18)"
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

                {/* Title */}
                <h1
                    style={{
                        fontSize: "36px",
                        margin: "0 0 10px",
                        fontWeight: 800,
                        color: "#111827",

                        textShadow:
                            "0 2px 5px rgba(255,255,255,0.9)"
                    }}
                >
                    Join Aahar Setu
                </h1>

                {/* Description */}
                <p
                    style={{
                        maxWidth: "650px",
                        margin: "0 auto 28px",

                        lineHeight: 1.6,

                        color: "#172033",
                        fontSize: "16px",
                        fontWeight: 500,

                        textShadow:
                            "0 1px 4px rgba(255,255,255,0.9)"
                    }}
                >
                    Create an account with Aahar Setu and become part of a
                    community working together to reduce food waste and
                    connect surplus food with people and communities in need.
                </p>

                {/* Registration Form */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        margin: "0 auto",

                        display: "flex",
                        flexDirection: "column"
                    }}
                >

                    <form onSubmit={handleSubmit}>

                        {/* Full Name */}
                        <div
                            style={{
                                marginBottom: "18px",
                                textAlign: "left"
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#111827",

                                    display: "block",
                                    marginBottom: "7px",

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
                                    boxSizing: "border-box",
                                    padding: "12px 14px",
                                    borderRadius: "10px",
                                    fontSize: "15px",

                                    backgroundColor:
                                        "rgba(255,255,255,0.88)",

                                    border:
                                        "1px solid rgba(148,163,184,0.5)"
                                }}
                            />
                        </div>

                        {/* Email */}
                        <div
                            style={{
                                marginBottom: "18px",
                                textAlign: "left"
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#111827",

                                    display: "block",
                                    marginBottom: "7px",

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
                                placeholder="Enter your email address"
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
                                    boxSizing: "border-box",
                                    padding: "12px 14px",
                                    borderRadius: "10px",
                                    fontSize: "15px",

                                    backgroundColor:
                                        "rgba(255,255,255,0.88)",

                                    border:
                                        "1px solid rgba(148,163,184,0.5)"
                                }}
                            />
                        </div>

                        {/* Mobile Number */}
                        <div
                            style={{
                                marginBottom: "18px",
                                textAlign: "left"
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#111827",

                                    display: "block",
                                    marginBottom: "7px",

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
                                    boxSizing: "border-box",
                                    padding: "12px 14px",
                                    borderRadius: "10px",
                                    fontSize: "15px",

                                    backgroundColor:
                                        "rgba(255,255,255,0.88)",

                                    border:
                                        "1px solid rgba(148,163,184,0.5)"
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div
                            style={{
                                marginBottom: "24px",
                                textAlign: "left"
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#111827",

                                    display: "block",
                                    marginBottom: "7px",

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
                                placeholder="Create a password"
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
                                    boxSizing: "border-box",
                                    padding: "12px 14px",
                                    borderRadius: "10px",
                                    fontSize: "15px",

                                    backgroundColor:
                                        "rgba(255,255,255,0.88)",

                                    border:
                                        "1px solid rgba(148,163,184,0.5)"
                                }}
                            />
                        </div>

                        {/* Create Account Button */}
                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                height: "48px",

                                backgroundColor: "#1D4ED8",
                                color: "white",

                                border: "none",
                                borderRadius: "10px",

                                fontSize: "16px",
                                fontWeight: 700,

                                cursor: "pointer",

                                boxShadow:
                                    "0 8px 20px rgba(29,78,216,0.25)"
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "#1747B9")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "#1D4ED8")
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
                            color: "#374151",
                            marginTop: "20px",

                            textShadow:
                                "0 1px 3px rgba(255,255,255,0.9)"
                        }}
                    >
                        Already have an account?{" "}

                        <Link
                            to="/login"
                            style={{
                                color: "#1D4ED8",
                                fontWeight: 700,
                                textDecoration: "none"
                            }}
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