import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f2",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          backgroundColor: "#dff5e3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "80px",
        }}
      >
        💚
      </div>

      <h1>Share Extra Food</h1>

      <p>
        Connect with NGOs and volunteers to donate your excess food
        and help those in need.
      </p>

      <button
        onClick={() => navigate("/onboarding-2")}
        style={{
          padding: "12px 30px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Welcome;