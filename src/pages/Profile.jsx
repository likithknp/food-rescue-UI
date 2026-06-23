import Navbar from "../components/Navbar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f0faf0",
          padding: "30px 15px",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "24px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: "#16a34a",
                color: "#fff",
                fontSize: "32px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 15px",
              }}
            >
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h2
              style={{
                color: "#166534",
                fontWeight: "700",
              }}
            >
              Hello, {user?.fullName || "User"} 👋
            </h2>

            <p
              style={{
                color: "#666",
                marginTop: "10px",
              }}
            >
              Welcome to Food Rescue
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <div className="mb-3">
              <strong>Full Name</strong>
              <p className="mb-0">
                {user?.fullName || "Not Available"}
              </p>
            </div>

            <div className="mb-3">
              <strong>Email</strong>
              <p className="mb-0">
                {user?.email || "Not Available"}
              </p>
            </div>

            <div className="mb-3">
              <strong>Mobile Number</strong>
              <p className="mb-0">
                {user?.mobileNumber || "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;