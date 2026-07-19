import { useState } from "react";
import axios from "axios";
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
      await axios.post(
        "https://food-rescue-backend.onrender.com/api/emergency",
        formData
      );

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
      console.error(error);
      alert("Failed to submit request");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "700px",
          margin: "20px auto",
          padding: "20px",
        }}
      >
        <h2>🚨 Emergency Request</h2>

        <div
          style={{
            background: "#fff3cd",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <strong>Emergency Request Guidelines</strong>
          <p>
            This will broadcast your urgent need to nearby donors
            and volunteers. Use only for genuine emergencies.
          </p>
        </div>

        <label>Type of Food Needed</label>
        <select
          name="foodType"
          value={formData.foodType}
          onChange={handleChange}
          className="form-control mb-3"
        >
          <option value="">Select food type</option>
          <option value="Cooked Food">Cooked Food</option>
          <option value="Packed Food">Packed Food</option>
          <option value="Groceries">Groceries</option>
          <option value="Drinking Water">Drinking Water</option>
        </select>

        <label>Approximate Quantity Needed</label>
        <select
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="form-control mb-3"
        >
          <option value="">Select quantity</option>
          <option>10-30 meals</option>
          <option>30-50 meals</option>
          <option>50+ meals</option>
        </select>

        <label>Delivery Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter complete address"
        />

        <button
          type="button"
          onClick={useCurrentLocation}
          style={{
            marginTop: "12px",
            marginBottom: "20px",
            border: "none",
            backgroundColor: "#dcfce7",
            color: "#166534",
            padding: "12px 18px",
            borderRadius: "12px",
            fontWeight: "600",
          }}
        >
          📍 Use Current Location
        </button>

        <label>Reason for Emergency</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="form-control mb-3"
          rows="4"
          placeholder="Explain why this is an emergency..."
        />

        <label>Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="+91 9876543210"
        />

        <label>Additional Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="form-control mb-4"
          rows="3"
          placeholder="Any other important information..."
        />

        <div
          style={{
            background: "#e8f5e9",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <strong>What happens next?</strong>
          <ul>
            <li>Request broadcast to nearby donors</li>
            <li>Volunteers notified immediately</li>
            <li>You'll receive calls/messages from helpers</li>
            <li>First responder gets priority assignment</li>
          </ul>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Broadcast Emergency Request
        </button>
      </div>
    </>
  );
}

export default EmergencyRequest;