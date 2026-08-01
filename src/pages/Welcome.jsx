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
        backgroundColor: "#F8FAFC",
        textAlign: "center",
        padding: "20px",
        paddingBottom: "100px",
        boxSizing: "border-box",
        background: "linear-gradient(135deg, #F8FAFC 0%, #F0F4FF 100%)"
      }}
    >
      <div
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "60px",
          marginBottom: "32px",
          boxShadow: "0 8px 24px rgba(37, 99, 235, 0.15)"
        }}
      >
        🍽️
      </div>

      <h1
        style={{
          fontSize: "40px",
          margin: "0 0 16px 0",
          color: "#111827",
          fontWeight: "700",
          letterSpacing: "-1px"
        }}
      >
        Welcome to FoodBridge
      </h1>

      <p
        style={{
          maxWidth: "450px",
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#6B7280",
          marginBottom: "40px",
          fontWeight: 400
        }}
      >
        Transform food waste into impact. Connect with NGOs, volunteers, and food rescue organizations to donate excess food and help those in need.
      </p>

      <button
        onClick={() => navigate("/onboarding-2")}
        style={{
          padding: "12px 40px",
          backgroundColor: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          height: "48px",
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
          transition: "all 0.25s ease"
        }}
        onMouseOver={(e) => {
          e.target.style.background = "#1D4ED8";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#2563EB";
          e.target.style.transform = "translateY(0)";
        }}
      >
        Get Started →
      </button>
    </div>
  );
}

export default Welcome;