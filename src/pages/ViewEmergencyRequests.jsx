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
      ACTIVE: { backgroundColor: "#dc3545", color: "white" },
      RESOLVED: { backgroundColor: "#28a745", color: "white" },
      PENDING: { backgroundColor: "#ffc107", color: "black" },
    };
    const style = statusStyles[status] || {
      backgroundColor: "#6c757d",
      color: "white",
    };
    return (
      <span
        style={{
          padding: "6px 12px",
          borderRadius: "5px",
          fontSize: "12px",
          fontWeight: "bold",
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
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "15px",
        }}
      >
        <h2>🚨 Emergency Requests</h2>

        {loading && (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>Loading emergency requests...</p>
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#f8d7da",
              color: "#721c24",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {!loading && requests.length === 0 && (
          <div
            style={{
              background: "#e7f3ff",
              color: "#004085",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            No emergency requests found.
          </div>
        )}

        <div>
          {requests.map((request) => (
            <div
              key={request.id}
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <h4 style={{ margin: "0 0 5px 0", color: "#333" }}>
                    {request.foodType}
                  </h4>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                    Requested: {formatDate(request.createdAt)}
                  </p>
                </div>
                <div>{getStatusBadge(request.status)}</div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Location:</strong>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    {request.location}
                  </p>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <strong>Quantity Needed:</strong>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    {request.quantity}
                  </p>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <strong>Reason for Emergency:</strong>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    {request.reason}
                  </p>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <strong>Contact Number:</strong>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    {request.contactNumber}
                  </p>
                </div>

                {request.notes && (
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Additional Notes:</strong>
                    <p style={{ margin: "5px 0", color: "#555" }}>
                      {request.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewEmergencyRequests;

