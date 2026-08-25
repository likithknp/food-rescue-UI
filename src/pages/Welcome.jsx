import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                boxSizing: "border-box",

                backgroundImage: `
                    linear-gradient(
                        rgba(255, 255, 255, 0.35),
                        rgba(255, 255, 255, 0.35)
                    ),
                    url("/food-rescue.jpeg")
                `,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",

                textAlign: "center"
            }}
        >
            {/* Main Content */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "920px",
                    maxHeight: "calc(100vh - 40px)",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    color: "#111827"
                }}
            >

                {/* Food Donation Image */}
                <div
                    style={{
                        width: "90px",
                        height: "90px",
                        margin: "0 auto 16px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative"
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

                {/* Welcome Heading */}
                <h1
                    style={{
                        fontSize: "36px",
                        fontWeight: "700",
                        margin: "0 0 10px",
                        color: "#111827",
                        textShadow: "0 2px 5px rgba(255,255,255,0.9)"
                    }}
                >
                    Welcome to Aahar Setu
                </h1>

                {/* Main Description */}
                <p
                    style={{
                        maxWidth: "780px",
                        margin: "0 auto 14px",
                        lineHeight: 1.5,
                        color: "#172033",
                        fontSize: "16px",
                        fontWeight: "500",
                        textShadow: "0 1px 4px rgba(255,255,255,0.9)"
                    }}
                >
                    Aahar Setu is a food-rescue platform that turns surplus food
                    into opportunity. We connect donors, restaurants, caterers,
                    grocery stores, and individuals with NGOs, community kitchens
                    and volunteers to ensure safe, timely redistribution of edible
                    food to those who need it most.
                </p>

                {/* How It Works */}
                <p
                    style={{
                        maxWidth: "780px",
                        margin: "8px auto 20px",
                        lineHeight: 1.5,
                        color: "#374151",
                        fontSize: "15px",
                        fontWeight: "400",
                        textShadow: "0 1px 3px rgba(255,255,255,0.8)"
                    }}
                >
                    How it works: donors post available food items or pickups;
                    nearby NGOs and volunteers receive notifications and coordinate
                    safe collection and delivery. The platform tracks donation
                    status, provides pickup logistics, and helps organizations
                    manage inventory and requests — reducing waste and feeding
                    communities.
                </p>

                {/* Buttons */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                        justifyContent: "center",
                        marginBottom: "18px",
                        flexWrap: "wrap"
                    }}
                >
                    {/* Guest */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        style={{
                            padding: "12px 28px",
                            backgroundColor: "#2563EB",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer",
                            minWidth: "170px",
                            height: "48px",
                            boxShadow: "0 4px 12px rgba(37,99,235,0.25)"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#1D4ED8";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#2563EB";
                        }}
                    >
                        Continue as Guest
                    </button>

                    {/* Register */}
                    <button
                        onClick={() => navigate("/register")}
                        style={{
                            padding: "12px 28px",
                            backgroundColor: "#2563EB",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer",
                            minWidth: "170px",
                            height: "48px",
                            boxShadow: "0 4px 12px rgba(37,99,235,0.25)"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#1D4ED8";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#2563EB";
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
                            fontWeight: "600",
                            cursor: "pointer",
                            minWidth: "170px",
                            height: "48px",
                            boxShadow: "0 4px 12px rgba(37,99,235,0.25)"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#1D4ED8";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#2563EB";
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
                        gap: "30px",
                        flexWrap: "wrap"
                    }}
                >

                    {/* About Platform */}
                    <div
                        style={{
                            textAlign: "left",
                            minWidth: "300px",
                            maxWidth: "420px"
                        }}
                    >
                        <div
                            style={{
                                fontSize: "14px",
                                color: "#111827",
                                fontWeight: "700",
                                marginBottom: "5px"
                            }}
                        >
                            About this platform
                        </div>

                        <div
                            style={{
                                fontSize: "13px",
                                color: "#374151",
                                lineHeight: 1.4,
                                textShadow: "0 1px 3px rgba(255,255,255,0.8)"
                            }}
                        >
                            Aahar Setu provides easy donor onboarding,
                            donation scheduling, pickup logistics, and
                            donation records to help NGOs and donors work
                            together efficiently.
                        </div>
                    </div>

                    {/* Founder */}
                    <div
                        style={{
                            minWidth: "280px"
                        }}
                    >
                        <div
                            style={{
                                fontSize: "14px",
                                color: "#111827",
                                fontWeight: "700"
                            }}
                        >
                            Founder
                        </div>

                        <div
                            style={{
                                marginTop: "6px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px"
                            }}
                        >
                            <img
                                src="/K7iT.jpeg"
                                alt="K7iT Logo"
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "8px",
                                    objectFit: "cover"
                                }}
                            />

                            <div style={{ textAlign: "left" }}>
                                <div
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        color: "#111827"
                                    }}
                                >
                                    Kesavulu Arthala
                                </div>

                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#4B5563"
                                    }}
                                >
                                    Founder & CEO, K7iT
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Welcome;