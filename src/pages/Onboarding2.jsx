import { useNavigate } from "react-router-dom";

function Onboarding2() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        background: "linear-gradient(135deg, #F8FAFC 0%, #F0F4FF 100%)",
        padding: "20px",
        paddingBottom: "100px",
        boxSizing: "border-box",
        gap: "30px",
      }}
    >
      {/* Skip button */}
      <div style={{ width: "100%", textAlign: "right" }}>
        <span
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer", fontSize: "14px", color: "#6B7280", fontWeight: 500, transition: "color 0.25s ease" }}
          onMouseOver={(e) => e.target.style.color = "#2563EB"}
          onMouseOut={(e) => e.target.style.color = "#6B7280"}
        >
          Skip
        </span>
      </div>

      {/* Center content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          flex: "0 1 auto",
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 8px 24px rgba(37, 99, 235, 0.15)"
          }}
        >
          <span style={{ fontSize: '60px' }}>📍</span>
        </div>

        {/* Text */}
        <h1 style={{ fontSize: "32px", fontWeight: "700", margin: 0, color: "#111827", letterSpacing: "-0.5px" }}>
          Find Nearby NGOs
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#6B7280",
            textAlign: "center",
            maxWidth: "380px",
            margin: 0,
            lineHeight: "1.6"
          }}
        >
          Discover verified NGOs and food rescue organizations near you. Track pickups in real-time and connect with helpers.
        </p>
      </div>

      {/* Next button - Fixed position for mobile visibility */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", position: "fixed", bottom: "20px", right: "20px", zIndex: 100 }}>
        <button
          onClick={() => navigate("/onboarding-3")}
          style={{
            padding: "12px 32px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
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
          Next →
        </button>
      </div>
    </div>
  );
}

export default Onboarding2;
