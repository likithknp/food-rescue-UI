import { useNavigate } from "react-router-dom";

function Onboarding3() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f0faf0",
        padding: "20px",
        boxSizing: "border-box",
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
        }}
      >
        {/* Yellow circle with award icon */}
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            backgroundColor: "#fef9c3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b45309"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="6" />
            <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
          </svg>
        </div>

        {/* Text */}
        <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, color: "#111" }}>
          Earn Rewards
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#555",
            textAlign: "center",
            maxWidth: "300px",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          Get points, badges, and recognition for every donation. Climb the leaderboard!
        </p>
      </div>

      {/* Get Started button */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "14px 28px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "30px",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}

export default Onboarding3;