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
    <div className="page-container" style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div className="dashboard-hero">
        <h2>FoodBridge</h2>
        <div className="hero-row">
          <div>
            <h3 style={{ margin: 0 }}>Welcome back!</h3>
            <p style={{ margin: "6px 0 0 0" }}>Let's make a difference today</p>
          </div>

          <div className="compact-badge">🏆 Gold Donor</div>
        </div>
      </div>

      <div>
        {/* Quick Actions */}
        <h3>Quick Actions</h3>

        <div className="quick-actions">
          <button onClick={() => navigate("/add-donation")} className="btn btn-primary">➕ Add Donation</button>
          <button onClick={() => navigate("/ngos")} className="btn btn-secondary">📍 Find NGOs</button>
        </div>

        {/* Impact */}
        <h3 style={{ marginTop: "30px" }}>Your Impact</h3>

        <div className="stat-grid">
          <StatCard value={stats.totalDonations} label="Total Donations" />
          <StatCard value={stats.availableFood} label="Available Food" />
          <StatCard value={stats.totalUsers} label="Users Helped" />
          <StatCard value={"1250"} label="Points Earned" />
        </div>

        {/* Recent Donations */}
        <h3 style={{ marginTop: "30px" }}>Recent Donations</h3>

        <DonationCard title="Food Donation" servings={`${stats.availableFood} Available`} status="ACTIVE" />

        {/* Emergency */}
        <h3 style={{ marginTop: "30px" }}>Emergency Request</h3>

        <div className="ds-alert">
          <h4>🚨 Emergency Request Nearby</h4>
          <p>Shelter needs food for 50 people.</p>
          <button onClick={() => navigate("/emergency-request")} className="btn btn-danger">Help Now</button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <span>🏠 Home</span>
        <span onClick={() => navigate("/add-donation")} style={{cursor:'pointer'}}>❤️ Donate</span>
        <span onClick={() => navigate("/ngos")} style={{cursor:'pointer'}}>📍 NGOs</span>
        <span onClick={() => navigate("/profile")} style={{cursor:'pointer'}}>👤 Profile</span>
      </div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="ds-stat-card text-center">
      <h2 style={{ margin: 0 }}>{value}</h2>
      <p style={{ marginTop: "8px", color: "#666" }}>{label}</p>
    </div>
  );
}

function DonationCard({ title, servings, status }) {
  return (
    <div className="donation-card">
      <h4>{title}</h4>
      <p>{servings}</p>
      <span className="status">{status}</span>
    </div>
  );
}

export default Dashboard;