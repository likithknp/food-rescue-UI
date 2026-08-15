import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
                boxSizing: "border-box",
                // Use an external placeholder image (Unsplash). Replace with your own public image path if available.
                backgroundImage: `
  linear-gradient(
    rgba(255, 255, 255, 0.35),
    rgba(255, 255, 255, 0.35)
  ),
  url("/food-rescue.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                textAlign: "center"
            }}
        >
            <div
                style={{
                    maxWidth: "920px",
                    width: "100%",
                    padding: "0px",
                    borderRadius: "16px",
                    // background: "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.82))",
                    background: "transparent",
                    backdropFilter: "blur(3px)",
                    WebkitBackdropFilter: "blur(3px)",
                    border: "0",

                    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",

                    color: "#111827",
                }}
            >
                <div
                    style={{
                        width: "110px",
                        height: "110px",
                        margin: "0 auto 24px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.20)",
                        border: "4px solid rgba(255,255,255,0.95)",
                    }}
                >
                    <img
                        src="/food-donation.png"
                        alt="Food donation"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>

                <h1
                    style={{
                        fontSize: "36px",
                        margin: "0 0 12px",
                        fontWeight: 800,
                        color: "#111827",
                        textShadow: "0 2px 5px rgba(255,255,255,0.9)",
                    }}
                >
                    Welcome to FoodBridge
                </h1>

                <p
                    style={{
                        maxWidth: "780px",
                        margin: "0 auto 16px",
                        lineHeight: 1.5,
                        color: "#172033",
                        fontSize: 15,
                        fontWeight: 500,
                        textShadow: "0 1px 4px rgba(255,255,255,0.9)",
                    }}
                >
                    Transform surplus food into opportunity. Connect with NGOs, donors, and volunteers to reduce waste and feed communities.
                </p>

                <div style={{ maxWidth: "780px", margin: "0 auto 24px", textAlign: "left", paddingX: "16px" }}>
                    <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                        <span style={{ fontSize: 20, minWidth: "24px" }}>📦</span>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#172033" }}>Post Donations</div>
                            <div style={{ fontSize: 13, color: "#4b5563", marginTop: "2px" }}>Share available food items easily</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                        <span style={{ fontSize: 20, minWidth: "24px" }}>📍</span>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#172033" }}>Find Nearby NGOs</div>
                            <div style={{ fontSize: 13, color: "#4b5563", marginTop: "2px" }}>Instant notifications to volunteers</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <span style={{ fontSize: 20, minWidth: "24px" }}>✅</span>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#172033" }}>Track & Deliver</div>
                            <div style={{ fontSize: 13, color: "#4b5563", marginTop: "2px" }}>Real-time status & delivery logistics</div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                        justifyContent: "center",
                        marginBottom: "26px",
                        flexWrap: "wrap"
                    }}
                >
                    <button
                        onClick={() => navigate("/dashboard")}
                        style={{
                            padding: "12px 28px",
                            backgroundColor: "#1D4ED8",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: "0 8px 20px rgba(29,78,216,0.25)"
                        }}
                        onMouseOver={e => (e.target.style.background = "#1747b9")}
                        onMouseOut={e => (e.target.style.background = "#1D4ED8")}
                    >
                        Continue as Guest
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        style={{
                            padding: "12px 28px",
                            backgroundColor: "#1D4ED8",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: "0 8px 20px rgba(29,78,216,0.25)"
                        }}
                        onMouseOver={e => (e.target.style.background = "#1747b9")}
                        onMouseOut={e => (e.target.style.background = "#1D4ED8")}
                    >
                        Create Account
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            padding: "12px 28px",
                            backgroundColor: "#1D4ED8",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: "0 8px 20px rgba(29,78,216,0.25)"
                        }}
                        onMouseOver={e => (e.target.style.background = "#1747b9")}
                        onMouseOut={e => (e.target.style.background = "#1D4ED8")}
                    >
                        Login
                    </button>
                </div>

                <div
                    style={{
                        marginTop: "16px",
                        paddingTop: "16px",
                        borderTop: "1px solid rgba(0,0,0,0.1)",
                        textAlign: "center"
                    }}
                >
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: "8px" }}>
                        Join the FoodBridge community today
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", flexWrap: "wrap" }}>
                        <img
                            src="/K7iT.jpeg"
                            alt="K7iT Logo"
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 6,
                                objectFit: "cover",
                            }}
                        />
                        <div style={{ fontSize: 12, color: "#4b5563" }}>
                            Built by <span style={{ fontWeight: 600, color: "#111827" }}>K7iT</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome
