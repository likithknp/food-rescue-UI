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

                // Your attached food-rescue image
                backgroundImage: `
          linear-gradient(
            rgba(255, 255, 255, 0.72),
            rgba(255, 255, 255, 0.72)
          ),
          url("/food-rescue.png")
        `,

                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",

                textAlign: "center",
            }}
        >
            <div
                style={{
                    maxWidth: "920px",
                    width: "100%",
                    padding: "48px",
                    borderRadius: "16px",

                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.82))",

                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",

                    boxShadow: "0 8px 40px rgba(2,6,23,0.15)",
                    color: "#1a1a1a",
                }}
            >
                {/* Food Icon */}
                <div
                    style={{
                        width: "96px",
                        height: "96px",
                        margin: "0 auto 24px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(29,78,216,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "44px",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                    }}
                    aria-hidden
                >
                    🍽️
                </div>

                {/* Heading */}
                <h1
                    style={{
                        fontSize: "36px",
                        margin: "0 0 12px",
                        fontWeight: 800,
                        color: "#111827",
                    }}
                >
                    Welcome to FoodBridge
                </h1>

                {/* Description */}
                <p
                    style={{
                        maxWidth: "780px",
                        margin: "0 auto 20px",
                        lineHeight: 1.6,
                        color: "#374151",
                        fontSize: 16,
                    }}
                >
                    FoodBridge is a food-rescue platform that turns surplus food into
                    opportunity. We connect donors, restaurants, caterers, grocery
                    stores, and individuals with NGOs, community kitchens and volunteers
                    to ensure safe, timely redistribution of edible food to those who
                    need it most.
                </p>

                {/* How it works */}
                <p
                    style={{
                        maxWidth: "780px",
                        margin: "8px auto 28px",
                        lineHeight: 1.6,
                        color: "#4b5563",
                        fontSize: 15,
                    }}
                >
                    <strong>How it works:</strong> Donors post available food items or
                    pickups. Nearby NGOs and volunteers receive notifications and
                    coordinate safe collection and delivery. FoodBridge tracks donation
                    status, pickup logistics, inventory, and requests — reducing food
                    waste and feeding communities.
                </p>

                {/* Buttons */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                        justifyContent: "center",
                        marginBottom: "26px",
                        flexWrap: "wrap",
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
                            boxShadow: "0 8px 20px rgba(29,78,216,0.25)",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "#1747b9";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = "#1D4ED8";
                        }}
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
                            backdropFilter: "blur(4px)",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background =
                                "rgba(29,78,216,0.08)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = "transparent";
                        }}
                    >
                        Login
                    </button>
                </div>

                {/* Bottom Information */}
                <div
                    style={{
                        marginTop: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "14px",
                        flexWrap: "wrap",
                    }}
                >
                    {/* About */}
                    <div
                        style={{
                            textAlign: "left",
                            minWidth: 260,
                            flex: 1,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 14,
                                color: "#1a1a1a",
                                fontWeight: 600,
                            }}
                        >
                            About this platform
                        </div>

                        <div
                            style={{
                                fontSize: 13,
                                color: "#4b5563",
                                marginTop: 6,
                            }}
                        >
                            FoodBridge provides easy donor onboarding, donation scheduling,
                            pickup logistics, and audit-ready donation records to help NGOs
                            and donors work together efficiently.
                        </div>
                    </div>

                    {/* Founder */}
                    <div
                        style={{
                            minWidth: 260,
                            flex: 1,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 14,
                                color: "#1a1a1a",
                                fontWeight: 600,
                            }}
                        >
                            Founder
                        </div>

                        <div
                            style={{
                                marginTop: 8,
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 8,
                                    backgroundColor: "rgba(29,78,216,0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    color: "#1D4ED8",
                                }}
                            >
                                K7
                            </div>

                            <div style={{ textAlign: "left" }}>
                                <div
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 700,
                                        color: "#111827",
                                    }}
                                >
                                    [Founder Name]
                                </div>

                                <div
                                    style={{
                                        fontSize: 13,
                                        color: "#6b7280",
                                    }}
                                >
                                    Founder & CEO, K7iT
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p
                    style={{
                        marginTop: 20,
                        color: "#9ca3af",
                        fontSize: 12,
                    }}
                >
                    FoodBridge — Connecting surplus food with communities in need.
                </p>
            </div>
        </div>
    );
}

export default Welcome;