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
    <div className="page-container" style={{ paddingBottom: 120 }}>
      {/* Header */}
      <div className="dashboard-hero">
        <h2 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '32px' }}>Welcome back!</h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '16px' }}>Let's reduce food waste together and make a difference.</p>
        <div className="hero-row">
          <div>
            <span className="compact-badge">🏆 Gold Donor</span>
          </div>
        </div>
      </div>

      <div>
        {/* Quick Actions */}
        <h3 style={{ marginBottom: '16px', marginTop: 0 }}>Quick Actions</h3>

        <div className="quick-actions">
          <button
            onClick={() => navigate("/add-donation")}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px' }}
          >
            ➕ Add Donation
          </button>
          <button
            onClick={() => navigate("/ngos")}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px' }}
          >
            📍 Find NGOs
          </button>
        </div>

        {/* Impact */}
        <h3 style={{ marginTop: "40px", marginBottom: '16px' }}>Your Impact</h3>

        <div className="stat-grid">
          <StatCard value={stats.totalDonations} label="Total Donations" />
          <StatCard value={stats.availableFood} label="Available Food" />
          <StatCard value={stats.totalUsers} label="Users Helped" />
          <StatCard value={"1250"} label="Points Earned" />
        </div>

        {/* Recent Donations */}
        <h3 style={{ marginTop: "40px", marginBottom: '16px' }}>Recent Donations</h3>

        <DonationCard title="Food Donation" servings={`${stats.availableFood} Available`} status="ACTIVE" />

        {/* Emergency */}
        <h3 style={{ marginTop: "40px", marginBottom: '16px' }}>⚡ Emergency Request</h3>

        <div className="ds-alert">
          <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>🚨 Emergency Request Nearby</h4>
          <p style={{ margin: '8px 0 16px 0' }}>Shelter needs food for 50 people. Help make a difference today.</p>
          <button onClick={() => navigate("/emergency-request")} className="btn btn-danger">
            Help Now →
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <span style={{ color: '#2563EB' }}>🏠 Home</span>
        <span onClick={() => navigate("/add-donation")}>❤️ Donate</span>
        <span onClick={() => navigate("/ngos")}>📍 NGOs</span>
        <span onClick={() => navigate("/profile")}>👤 Profile</span>
      </div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="ds-stat-card">
      <p style={{ margin: 0, color: '#6B7280', fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
      <h2 className="ds-stat-value">{value}</h2>
    </div>
  );
}

function DonationCard({ title, servings, status }) {
  return (
    <div className="donation-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h4 style={{ margin: 0 }}>🍖 {title}</h4>
          <p style={{ margin: '8px 0 0 0', color: '#6B7280' }}>{servings}</p>
        </div>
        <span className="status" style={{ display: 'inline-block', background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
          {status}
        </span>
      </div>
    </div>
  );
}

export default Dashboard;