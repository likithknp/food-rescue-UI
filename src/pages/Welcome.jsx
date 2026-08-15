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
                        margin: "0 auto 20px",
                        lineHeight: 1.6,
                        color: "#172033",
                        fontSize: 16,
                        fontWeight: 500,
                        textShadow: "0 1px 4px rgba(255,255,255,0.9)",
                    }}
                >
                    FoodBridge is a food-rescue platform that turns surplus food into
                    opportunity. We connect donors, restaurants, caterers, grocery stores,
                    and individuals with NGOs, community kitchens and volunteers to ensure
                    safe, timely redistribution of edible food to those who need it most.
                </p>

                <p style={{ maxWidth: "780px", margin: "8px auto 28px", lineHeight: 1.6, color: "#4b5563", fontSize: 15 }}>
                    How it works: donors post available food items or pickups; nearby NGOs and volunteers receive notifications and coordinate safe collection and delivery. The platform tracks donation status, provides pickup logistics, and helps organizations manage inventory and requests — reducing waste and feeding communities.
                </p>

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
                            padding: "12px 26px",
                            backgroundColor: "transparent",
                            color: "#1D4ED8",
                            border: "2px solid #1D4ED8",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: 700,
                            cursor: "pointer",
                            backdropFilter: "blur(4px)"
                        }}
                        onMouseOver={e => (e.target.style.background = "rgba(29,78,216,0.08)")}
                        onMouseOut={e => (e.target.style.background = "transparent")}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        style={{
                            padding: "12px 26px",
                            backgroundColor: "transparent",
                            color: "#1D4ED8",
                            border: "2px solid #1D4ED8",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: 700,
                            cursor: "pointer",
                            backdropFilter: "blur(4px)"
                        }}
                        onMouseOver={e => (e.target.style.background = "rgba(29,78,216,0.08)")}
                        onMouseOut={e => (e.target.style.background = "transparent")}
                    >
                        Guest Login
                    </button>
                </div>

                <div
                    style={{
                        marginTop: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "14px",
                        flexWrap: "wrap"
                    }}
                >
                    <div style={{ textAlign: "left", minWidth: 260 }}>
                        <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 600 }}>About this platform</div>
                        <div style={{ fontSize: 13, color: "#4b5563", marginTop: 6 }}>
                            FoodBridge provides easy donor onboarding, donation scheduling, pickup logistics, and audit-ready donation records to help NGOs and donors work together efficiently.
                        </div>
                    </div>

                    <div style={{ minWidth: 260 }}>
                        <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 600 }}>Founder</div>

                        {/* Replace [Founder Name] with the real name of the Founder & CEO of K7iT */}
                        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 12 }}>
                            <img
                                src="/K7iT.jpeg"
                                alt="K7iT Logo"
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 8,
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                            <div style={{ textAlign: "left" }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
                                    [Founder Name]
                                </div>
                                <div style={{ fontSize: 13, color: "#6b7280" }}>Founder & CEO, K7iT</div>
                            </div>
                        </div>
                    </div>
                </div>

                <p style={{ marginTop: 20, color: "#9ca3af", fontSize: 12 }}>
                    Note: Replace the placeholder founder name with the correct full name and a short bio if desired. If you use a real photo of children for the background, ensure permissions and privacy requirements are met; consider an illustration for safety.
                </p>
            </div>
        </div>
    );
}

export default Welcome
