import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  // Base64 encoded orphan children image (embedded directly)
  const backgroundImageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwwUAxUWCAcIBQIH/8H/2gAIAwEAAhADEQA/AOqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9k=";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "28px",
        boxSizing: "border-box",
        backgroundImage: `url('${backgroundImageBase64}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "12px",
        border: "6px solid rgba(255,255,255,0.85)",
        boxShadow: "0 8px 30px rgba(2,6,23,0.12)"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          padding: "48px 40px",
          background: "transparent",
          color: "#ffffff",
          textAlign: "center",
          textShadow: "0 3px 18px rgba(0,0,0,0.6)"
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "84px",
            height: "84px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            boxShadow: "0 8px 20px rgba(2,6,23,0.25)",
            color: "#1D4ED8"
          }}
          aria-hidden
        >
          🍽️
        </div>

        {/* Main Title */}
        <h1 style={{ fontSize: "36px", margin: "0 0 12px", fontWeight: "800", color: "#fff" }}>
          Welcome to FoodBridge
        </h1>

        {/* Description 1 */}
        <p style={{ maxWidth: "880px", margin: "0 auto 18px", lineHeight: "1.6", color: "rgba(255,255,255,0.95)", fontSize: "16px" }}>
          FoodBridge is a food-rescue platform that turns surplus food into opportunity. We connect donors (restaurants, caterers, grocery stores, and individuals) with NGOs, community kitchens and volunteers to ensure safe, timely redistribution of edible food to those who need it most.
        </p>

        {/* Description 2 */}
        <p style={{ maxWidth: "880px", margin: "0 auto 26px", lineHeight: "1.6", color: "rgba(255,255,255,0.92)", fontSize: "15px" }}>
          How it works: donors post available food items or pickups; nearby NGOs and volunteers receive notifications and coordinate safe collection and delivery. The platform tracks donation status, provides pickup logistics, and helps organizations manage inventory and requests — reducing waste and feeding communities.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" }}>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "12px 30px",
              backgroundColor: "#1D4ED8",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(29,78,216,0.28)",
              transition: "all 0.25s ease"
            }}
            onMouseOver={(e) => (e.target.style.background = "#1747b9")}
            onMouseOut={(e) => (e.target.style.background = "#1D4ED8")}
          >
            Create Account
          </button>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 26px",
              backgroundColor: "transparent",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.9)",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              backdropFilter: "blur(2px)",
              transition: "all 0.25s ease"
            }}
            onMouseOver={(e) => (e.target.style.background = "rgba(255,255,255,0.06)")}
            onMouseOut={(e) => (e.target.style.background = "transparent")}
          >
            Login
          </button>
        </div>

        {/* Footer Info */}
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
          {/* Orphan Children Image Section */}
          <div style={{ minWidth: "260px", textAlign: "center", color: "rgba(255,255,255,0.95)" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px" }}>Our Mission</div>
            <div style={{
              width: "100%",
              height: "140px",
              borderRadius: "12px",
              backgroundImage: `url('${backgroundImageBase64}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
              border: "3px solid rgba(255,255,255,0.6)"
            }} />
            <div style={{ fontSize: "12px", marginTop: "8px", color: "rgba(255,255,255,0.85)" }}>
              Helping orphan children through food rescue & community support
            </div>
          </div>

          {/* About Platform Section */}
          <div style={{ minWidth: "260px", textAlign: "left", color: "rgba(255,255,255,0.95)" }}>
            <div style={{ fontSize: "14px", fontWeight: "700" }}>About this platform</div>
            <div style={{ fontSize: "13px", marginTop: "8px", color: "rgba(255,255,255,0.9)" }}>
              FoodBridge provides easy donor onboarding, donation scheduling, pickup logistics, and audit-ready donation records to help NGOs and donors work together efficiently.
            </div>
          </div>

          {/* Founder Section */}
          <div style={{ minWidth: "260px", color: "rgba(255,255,255,0.95)" }}>
            <div style={{ fontSize: "14px", fontWeight: "700" }}>Founder & CEO</div>
            <div style={{ marginTop: "10px", display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1D4ED8", fontWeight: "700", fontSize: "14px" }}>
                K7
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>
                  Kesav Arthala
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)" }}>Founder & CEO, K7iT</div>
              </div>
            </div>
          </div>
        </div>

        <p style={{ marginTop: "20px", color: "rgba(255,255,255,0.85)", fontSize: "12px" }}>
          Empowering communities through food rescue, nutrition, and sustainable giving.
        </p>
      </div>
    </div>
  );
}

export default Welcome;