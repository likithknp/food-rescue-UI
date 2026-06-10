import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalDonations: 0,
    availableFood: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();

      setStats({
        totalDonations: response.data.totalDonations || 0,
        availableFood: response.data.availableFood || 0,
        totalUsers: response.data.totalUsers || 0,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8f9",
        paddingBottom: "90px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#16a34a",
          color: "white",
          padding: "24px",
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
        }}
      >
        <h2 style={{ margin: 0 }}>FoodBridge</h2>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Welcome back!</h3>
            <p style={{ margin: "6px 0 0 0" }}>
              Let's make a difference today
            </p>
          </div>

          <div
            style={{
              background: "#22c55e",
              padding: "10px 16px",
              borderRadius: "15px",
            }}
          >
            🏆 Gold Donor
          </div>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Quick Actions */}
        <h3>Quick Actions</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <button
            onClick={() => navigate("/add-donation")}
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "15px",
              padding: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ➕ Add Donation
          </button>

          <button
            onClick={() => navigate("/ngos")}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "15px",
              padding: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            📍 Find NGOs
          </button>
        </div>

        {/* Impact */}
        <h3 style={{ marginTop: "30px" }}>Your Impact</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <StatCard
            value={stats.totalDonations}
            label="Total Donations"
          />

          <StatCard
            value={stats.availableFood}
            label="Available Food"
          />

          <StatCard
            value={stats.totalUsers}
            label="Users Helped"
          />

          <StatCard
            value="1250"
            label="Points Earned"
          />
        </div>

        {/* Recent Donations */}
        <h3 style={{ marginTop: "30px" }}>Recent Donations</h3>

        <DonationCard
          title="Food Donation"
          servings={`${stats.availableFood} Available`}
          status="ACTIVE"
        />

        {/* Emergency */}
        <h3 style={{ marginTop: "30px" }}>Emergency Request</h3>

        <div
          style={{
            background: "#fee2e2",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h4>🚨 Emergency Request Nearby</h4>

          <p>
            Shelter needs food for 50 people.
          </p>

          <button
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
          >
            Help Now
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-around",
          padding: "15px",
        }}
      >
        <span>🏠 Home</span>
        <span onClick={() => navigate("/add-donation")}>❤️ Donate</span>
        <span onClick={() => navigate("/ngos")}>📍 NGOs</span>
        <span onClick={() => navigate("/profile")}>👤 Profile</span>
      </div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "15px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ margin: 0 }}>{value}</h2>
      <p style={{ marginTop: "8px", color: "#666" }}>
        {label}
      </p>
    </div>
  );
}

function DonationCard({ title, servings, status }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "15px",
        padding: "15px",
        marginBottom: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h4>{title}</h4>
      <p>{servings}</p>
      <span
        style={{
          background: "#dcfce7",
          color: "#166534",
          padding: "4px 10px",
          borderRadius: "8px",
        }}
      >
        {status}
      </span>
    </div>
  );
}

export default Dashboard;