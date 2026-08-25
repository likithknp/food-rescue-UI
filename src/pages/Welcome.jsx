import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 20px",
                boxSizing: "border-box",

                // Same background style as Login page
                backgroundImage:
                    'linear-gradient(rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.35)), url("/food-rescue.jpeg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >

            {/* Main Welcome Content */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "920px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
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

                {/* Welcome Heading */}
                <h1
                    style={{
                        fontSize: "32px",
                        fontWeight: "700",
                        margin: "0 0 8px 0",
                        color: "#111827",
                        textAlign: "center",
                        textShadow: "0 2px 5px rgba(255,255,255,0.9)",
                    }}
                >
                    Welcome to FoodBridge
                </h1>

                {/* Introduction */}
                <p
                    style={{
                        maxWidth: "780px",
                        margin: "0 auto 20px",
                        lineHeight: 1.6,
                        color: "#172033",
                        fontSize: "16px",
                        fontWeight: 500,
                        textAlign: "center",
                        textShadow: "0 1px 4px rgba(255,255,255,0.9)",
                    }}
                >
                    FoodBridge is a food-rescue platform that turns surplus food
                    into opportunity. We connect donors, restaurants, caterers,
                    grocery stores, and individuals with NGOs, community kitchens,
                    and volunteers to ensure safe and timely redistribution of
                    edible food to those who need it most.
                </p>

                {/* How FoodBridge Works */}
                <p
                    style={{
                        maxWidth: "780px",
                        margin: "8px auto 28px",
                        lineHeight: 1.6,
                        color: "#4B5563",
                        fontSize: "15px",
                        fontWeight: 400,
                        textAlign: "center",
                        textShadow: "0 1px 3px rgba(255,255,255,0.8)",
                    }}
                >
                    How it works: donors post available food items or pickups;
                    nearby NGOs and volunteers receive notifications and
                    coordinate safe collection and delivery. FoodBridge helps
                    track donations, manage pickup logistics, and maintain
                    donation records — reducing food waste and helping feed
                    communities.
                </p>

                {/* Action Buttons */}
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "30px",
                        flexWrap: "wrap",
                    }}
                >

                    {/* Continue as Guest */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        style={{
                            padding: "12px 28px",
                            backgroundColor: "#2563EB",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: 600,
                            cursor: "pointer",
                            minWidth: "170px",
                            height: "48px",
                            transition: "all 0.25s ease",
                            boxShadow:
                                "0 4px 12px rgba(37, 99, 235, 0.2)",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "#1D4ED8";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = "#2563EB";
                        }}
                    >
                        Continue as Guest
                    </button>

                    {/* Create Account */}
                    <button
                        onClick={() => navigate("/register")}
                        style={{
                            padding: "12px 28px",
                            backgroundColor: "#2563EB",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: 600,
                            cursor: "pointer",
                            minWidth: "170px",
                            height: "48px",
                            transition: "all 0.25s ease",
                            boxShadow:
                                "0 4px 12px rgba(37, 99, 235, 0.2)",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "#1D4ED8";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = "#2563EB";
                        }}
                    >
                        Create Account
                    </button>

                    {/* Login */}
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            padding: "12px 28px",
                            backgroundColor: "#2563EB",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: 600,
                            cursor: "pointer",
                            minWidth: "170px",
                            height: "48px",
                            transition: "all 0.25s ease",
                            boxShadow:
                                "0 4px 12px rgba(37, 99, 235, 0.2)",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "#1D4ED8";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = "#2563EB";
                        }}
                    >
                        Login
                    </button>
                </div>

                {/* About + Founder */}
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        gap: "40px",
                        flexWrap: "wrap",
                        marginTop: "8px",
                    }}
                >

                    {/* About Platform */}
                    <div
                        style={{
                            textAlign: "left",
                            width: "360px",
                            maxWidth: "100%",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "14px",
                                color: "#111827",
                                fontWeight: 600,
                                marginBottom: "6px",
                                textShadow:
                                    "0 1px 3px rgba(255,255,255,0.9)",
                            }}
                        >
                            About FoodBridge
                        </div>

                        <div
                            style={{
                                fontSize: "13px",
                                color: "#4B5563",
                                lineHeight: 1.5,
                                textShadow:
                                    "0 1px 3px rgba(255,255,255,0.8)",
                            }}
                        >
                            FoodBridge provides easy donor onboarding,
                            donation scheduling, pickup logistics, and
                            donation records to help NGOs and donors work
                            together efficiently.
                        </div>
                    </div>

                    {/* Founder */}
                    <div
                        style={{
                            width: "300px",
                            maxWidth: "100%",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "14px",
                                color: "#111827",
                                fontWeight: 600,
                                textAlign: "left",
                                marginBottom: "8px",
                                textShadow:
                                    "0 1px 3px rgba(255,255,255,0.9)",
                            }}
                        >
                            Founder
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <img
                                src="/K7iT.jpeg"
                                alt="K7iT Logo"
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />

                            <div style={{ textAlign: "left" }}>
                                <div
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: 700,
                                        color: "#111827",
                                        textShadow:
                                            "0 1px 3px rgba(255,255,255,0.9)",
                                    }}
                                >
                                    Kesavulu Arthala
                                </div>

                                <div
                                    style={{
                                        fontSize: "13px",
                                        color: "#6B7280",
                                    }}
                                >
                                    Founder & CEO, K7iT
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p
                    style={{
                        marginTop: "20px",
                        color: "#6B7280",
                        fontSize: "12px",
                        textAlign: "center",
                        textShadow:
                            "0 1px 3px rgba(255,255,255,0.8)",
                    }}
                >
                    Together, we can rescue food, reduce waste, and make a
                    meaningful difference in our communities.
                </p>

            </div>
        </div>
    );
}

export default Welcome;