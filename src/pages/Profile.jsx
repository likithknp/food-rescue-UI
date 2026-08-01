import Navbar from "../components/Navbar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", padding: "40px 15px" }}>
        <div style={{
          maxWidth: "720px",
          margin: "0 auto",
          background: "#FFFFFF",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
        }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                color: "#fff",
                fontSize: "44px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 8px 24px rgba(37, 99, 235, 0.3)"
              }}
            >
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h1 style={{
              color: "#111827",
              fontWeight: "700",
              margin: "0 0 8px 0",
              fontSize: "32px"
            }}>
              {user?.fullName || "User"} 👋
            </h1>

            <p style={{
              color: "#6B7280",
              marginTop: "0",
              fontSize: "15px"
            }}>
              Welcome to FoodBridge - Reducing Food Waste Together
            </p>
          </div>

          <div style={{
            backgroundColor: "#F8FAFC",
            borderRadius: "12px",
            padding: "28px",
            marginBottom: "28px"
          }}>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                👤 Full Name
              </label>
              <p style={{ margin: "0", color: "#111827", fontSize: '16px', fontWeight: 500 }}>
                {user?.fullName || "Not Available"}
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                ✉️ Email
              </label>
              <p style={{ margin: "0", color: "#111827", fontSize: '16px', fontWeight: 500 }}>
                {user?.email || "Not Available"}
              </p>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                📞 Mobile Number
              </label>
              <p style={{ margin: "0", color: "#111827", fontSize: '16px', fontWeight: 500 }}>
                {user?.mobileNumber || "Not Available"}
              </p>
            </div>
          </div>

          <div style={{
            padding: '20px',
            background: 'rgba(34, 197, 94, 0.05)',
            borderLeft: '4px solid #22C55E',
            borderRadius: '8px'
          }}>
            <p style={{ margin: 0, color: '#16A34A', fontSize: '14px', fontWeight: 500 }}>
              ✓ Your account is active and verified
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;