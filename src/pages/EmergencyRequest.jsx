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

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/emergency",
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
          className="form-control mb-3"
          placeholder="Enter complete address"
        />

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