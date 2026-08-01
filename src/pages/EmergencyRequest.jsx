import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

function EmergencyRequest() {
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    location: "",
    reason: "",
    contactNumber: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          const data = await response.json();

          setFormData((prev) => ({
            ...prev,
            location:
              data.display_name ||
              `${lat}, ${lng}`,
          }));
        } catch (error) {
          console.error(error);

          setFormData((prev) => ({
            ...prev,
            location: `${lat}, ${lng}`,
          }));
        }
      },
      (error) => {
        console.error(error);
        alert("Unable to fetch location");
      }
    );
  };

  const handleSubmit = async () => {
    try {
      // Use the central API client so the baseURL and auth headers are consistent
      await api.post(`/emergency`, formData);

      alert("Emergency request broadcast successfully!");

      setFormData({
        foodType: "",
        quantity: "",
        location: "",
        reason: "",
        contactNumber: "",
        notes: "",
      });
    } catch (error) {
      console.error("Emergency request error:", error.response || error.message || error);
      // Show more detailed message when available
      const msg = error.response?.data?.message || error.response?.data || error.message || "Failed to submit request";
      alert(msg);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="page-header" style={{ marginBottom: '40px' }}>
          <h1>⚡ Emergency Food Request</h1>
          <p className="subtitle">Request urgent food assistance for your community or organization.</p>
        </div>

        <div style={{
          maxWidth: "720px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px"
        }}>

          <div style={{
            background: "rgba(245, 158, 11, 0.05)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            borderLeft: "4px solid #F59E0B",
            padding: "20px",
            borderRadius: "12px",
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#F59E0B', fontWeight: 700 }}>📋 Emergency Request Guidelines</h4>
            <p style={{ margin: '8px 0', color: '#6B7280', fontSize: '14px' }}>
              This will broadcast your urgent need to nearby donors and volunteers. Use only for genuine emergencies. Your request will reach a network of food rescue organizations and volunteers in your area.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div>
              <label className="form-label">Type of Food Needed</label>
              <select
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                className="form-select"
                required
                style={{ padding: "12px 14px", borderRadius: "10px" }}
              >
                <option value="">Select food type...</option>
                <option value="Cooked Food">🍚 Cooked Food</option>
                <option value="Packed Food">📦 Packed Food</option>
                <option value="Groceries">🛒 Groceries</option>
                <option value="Drinking Water">🥤 Drinking Water</option>
              </select>
            </div>

            <div>
              <label className="form-label">Approximate Quantity Needed</label>
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-select"
                required
                style={{ padding: "12px 14px", borderRadius: "10px" }}
              >
                <option value="">Select quantity...</option>
                <option>10-30 meals</option>
                <option>30-50 meals</option>
                <option>50-100 meals</option>
                <option>100+ meals</option>
              </select>
            </div>

            <div>
              <label className="form-label">Delivery Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter complete address"
                required
                style={{ padding: "12px 14px", borderRadius: "10px" }}
              />

              <button
                type="button"
                onClick={useCurrentLocation}
                style={{
                  marginTop: "12px",
                  border: "none",
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  color: "#22C55E",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.25s ease"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "rgba(34, 197, 94, 0.15)"}
                onMouseOut={(e) => e.target.style.backgroundColor = "rgba(34, 197, 94, 0.1)"}
              >
                📍 Use Current Location
              </button>
            </div>

            <div>
              <label className="form-label">Reason for Emergency</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="form-control"
                rows="4"
                placeholder="Explain why this is an emergency situation..."
                required
                style={{ padding: "12px 14px", borderRadius: "10px", resize: "vertical" }}
              />
            </div>

            <div>
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="+91 9876543210"
                required
                style={{ padding: "12px 14px", borderRadius: "10px" }}
              />
            </div>

            <div>
              <label className="form-label">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Any other important information..."
                style={{ padding: "12px 14px", borderRadius: "10px", resize: "vertical" }}
              />
            </div>

            <div style={{
              background: "rgba(34, 197, 94, 0.05)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              borderLeft: "4px solid #22C55E",
              padding: "20px",
              borderRadius: "12px",
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#22C55E', fontWeight: 700 }}>✅ What Happens Next?</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#6B7280', fontSize: '14px', lineHeight: '1.6' }}>
                <li>Your request is broadcast to nearby donors and volunteers</li>
                <li>Food rescue organizations are notified immediately</li>
                <li>You'll receive calls or messages from volunteers ready to help</li>
                <li>Fastest responders are prioritized for assistance</li>
              </ul>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px 20px",
                backgroundColor: "#EF4444",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                height: "48px",
                transition: "all 0.25s ease",
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
              }}
              onMouseOver={(e) => e.target.style.background = "#DC2626"}
              onMouseOut={(e) => e.target.style.background = "#EF4444"}
            >
              🚨 Broadcast Emergency Request
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

export default EmergencyRequest;