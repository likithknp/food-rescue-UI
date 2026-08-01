import { useState, useEffect } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

function ViewEmergencyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmergencyRequests();
  }, []);

  const fetchEmergencyRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get("/emergency");
      setRequests(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching emergency requests:", err);
      setError("Failed to load emergency requests");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      ACTIVE: { background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' },
      RESOLVED: { background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' },
      PENDING: { background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' },
    };
    const style = statusStyles[status] || {
      background: 'rgba(107, 114, 128, 0.1)',
      color: '#6B7280',
    };
    return (
      <span
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '600',
          display: 'inline-block',
          ...style,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header" style={{ marginBottom: '40px' }}>
          <h1>🚨 Emergency Food Requests</h1>
          <p className="subtitle">Help communities in urgent need. Every donation makes a difference.</p>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ fontSize: '16px', color: '#6B7280' }}>⏳ Loading emergency requests...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '40px' }}>
            <strong>⚠️ Error</strong>
            <p style={{ margin: '8px 0 0 0' }}>{error}</p>
          </div>
        )}

        {!loading && requests.length === 0 && (
          <div className="alert alert-info" style={{ marginBottom: '40px' }}>
            <strong>ℹ️ No Emergency Requests</strong>
            <p style={{ margin: '8px 0 0 0' }}>There are currently no emergency food requests. Check back soon!</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: '20px' }}>
          {requests.map((request) => (
            <div
              key={request.id}
              style={{
                background: "white",
                border: "none",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                transition: "all 0.25s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(15,23,42,0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "20px", gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 8px 0", color: "#111827", fontSize: '20px', fontWeight: 700 }}>
                    {request.foodType ? `🍖 ${request.foodType}` : "Emergency Request"}
                  </h3>
                  <p style={{ margin: "0", fontSize: "13px", color: "#6B7280" }}>
                    ⏰ Requested {formatDate(request.createdAt)}
                  </p>
                </div>
                <div>{getStatusBadge(request.status)}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>📍 Location</label>
                  <p style={{ margin: "0", color: "#111827", fontSize: '15px', fontWeight: 500 }}>
                    {request.location}
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>📦 Quantity Needed</label>
                  <p style={{ margin: "0", color: "#111827", fontSize: '15px', fontWeight: 500 }}>
                    {request.quantity}
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>📞 Contact</label>
                  <p style={{ margin: "0", color: "#111827", fontSize: '15px', fontWeight: 500 }}>
                    {request.contactNumber}
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(245, 158, 11, 0.05)', borderLeft: '4px solid #F59E0B', borderRadius: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>⚡ Emergency Reason</label>
                <p style={{ margin: "0", color: "#111827", fontSize: '14px' }}>
                  {request.reason}
                </p>
              </div>

              {request.notes && (
                <div style={{ marginBottom: '16px', padding: '16px', background: 'rgba(59, 130, 246, 0.05)', borderLeft: '4px solid #3b82f6', borderRadius: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>📝 Additional Notes</label>
                  <p style={{ margin: "0", color: "#111827", fontSize: '14px' }}>
                    {request.notes}
                  </p>
                </div>
              )}

              <button style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '15px',
                transition: 'all 0.25s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ✓ Help with this Request
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewEmergencyRequests;

