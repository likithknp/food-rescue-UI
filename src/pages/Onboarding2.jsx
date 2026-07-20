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
        backgroundColor: "#f0faf0",
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
          style={{ cursor: "pointer", fontSize: "16px", color: "#333" }}
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
          gap: "20px",
          flex: "0 1 auto",
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            backgroundColor: "#fde8d8",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Location pin SVG */}
          <svg
            xmlns="[w3.org](http://www.w3.org/2000/svg)"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e8440a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        {/* Text */}
        <h1 style={{ fontSize: "26px", fontWeight: "bold", margin: 0 }}>
          Find Nearby NGOs
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#555",
            textAlign: "center",
            maxWidth: "300px",
            margin: 0,
          }}
        >
          Discover verified NGOs near you and track real-time pickup status
          with live maps
        </p>
      </div>

      {/* Next button - Fixed position for mobile visibility */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", position: "fixed", bottom: "20px", right: "20px", zIndex: 100 }}>
        <button
          onClick={() => navigate("/onboarding-3")}
          style={{
            padding: "14px 28px",
            backgroundColor: "#e8440a",
            color: "white",
            border: "none",
            borderRadius: "30px",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(232, 68, 10, 0.3)",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Onboarding2;
