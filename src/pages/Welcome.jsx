import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f2",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box",
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
          marginBottom: "20px",
        }}
      >
        💚
      </div>

      <h1
        style={{
          fontSize: "36px",
          margin: "0 0 15px 0",
          color: "#222",
        }}
      >
        Share Extra Food
      </h1>

      <p
        style={{
          maxWidth: "350px",
          fontSize: "18px",
          lineHeight: "1.6",
          color: "#555",
          marginBottom: "30px",
        }}
      >
        Connect with NGOs and volunteers to donate your excess food and help
        those in need.
      </p>

      <button
        onClick={() => navigate("/onboarding-2")}
        style={{
          padding: "14px 40px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Welcome;