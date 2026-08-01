import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createDonation } from "../services/donationService";

function AddDonation() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [donation, setDonation] = useState({
    foodName: "",
    quantity: "",
    expiryTime: "",
    pickupLocation: "",
    description: "",
  });

  const handleChange = (e) => {
    setDonation({
      ...donation,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
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

        setDonation((prev) => ({
          ...prev,
          pickupLocation:
            data.display_name ||
            `${lat}, ${lng}`,
        }));
      } catch (error) {
        console.error(error);

        setDonation((prev) => ({
          ...prev,
          pickupLocation: `${lat}, ${lng}`,
        }));
      }
    },
    (error) => {
      console.error(error);
      alert("Unable to fetch location");
    }
  );
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!donation.foodName || !donation.quantity || !donation.expiryTime || !donation.pickupLocation) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Prepare the donation data in the format the backend expects
      // Convert date string (YYYY-MM-DD) to LocalDateTime format (YYYY-MM-DDTHH:mm:ss)
      const expiryDateTime = donation.expiryTime ? `${donation.expiryTime}T23:59:59` : "";

      const donationData = {
        foodName: donation.foodName,
        quantity: donation.quantity,
        expiryTime: expiryDateTime,
        pickupLocation: donation.pickupLocation,
        description: donation.description,
        status: "AVAILABLE"
      };

      console.log("Submitting donation:", donationData);

      // Call the API to create the donation
      const response = await createDonation(donationData);

      console.log("Donation response:", response.data);

      alert("Donation posted successfully!");

      // Clear form and redirect to donations page
      setDonation({
        foodName: "",
        quantity: "",
        expiryTime: "",
        pickupLocation: "",
        description: "",
      });
      setImages([]);

      // Redirect to the donations page to see the new donation
      navigate("/donations");

    } catch (error) {
      console.error("Error submitting donation:", error);
      const msg = error?.response?.data?.message || error?.response?.data || error.message || "Failed to post donation";
      alert(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

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
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#111827' }}>
              🍖 Add Food Donation
            </h1>
            <p style={{ margin: '8px 0 0 0', color: '#6B7280', fontSize: '15px' }}>
              Help us reduce food waste by donating available food to those in need.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">
                Food Type
              </label>
              <select
                className="form-select"
                name="foodName"
                value={donation.foodName}
                onChange={handleChange}
                required
                style={{ padding: "12px 14px", borderRadius: "10px" }}
              >
                <option value="">Select food type</option>
                <option value="Cooked Food">🍚 Cooked Food</option>
                <option value="Packed Food">📦 Packed Food</option>
                <option value="Vegetables">🥕 Vegetables</option>
                <option value="Fruits">🍎 Fruits</option>
                <option value="Bakery Items">🥐 Bakery Items</option>
                <option value="Beverages">🥤 Beverages</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                className="form-control"
                placeholder="e.g., 10 servings, 5 kg"
                value={donation.quantity}
                onChange={handleChange}
                required
                style={{ padding: "12px 14px", borderRadius: "10px" }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryTime"
                className="form-control"
                value={donation.expiryTime}
                onChange={handleChange}
                required
                style={{ padding: "12px 14px", borderRadius: "10px" }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                className="form-control"
                placeholder="Enter address or use current location"
                value={donation.pickupLocation}
                onChange={handleChange}
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
                  padding: "12px 18px",
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

            <div className="mb-4">
              <label className="form-label">
                Description (Optional)
              </label>
              <textarea
                rows="4"
                name="description"
                className="form-control"
                placeholder="Add any special instructions or details"
                value={donation.description}
                onChange={handleChange}
                style={{ borderRadius: "10px", padding: "12px 14px", resize: "vertical" }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ marginBottom: "16px" }}>
                📷 Upload Food Photos
              </label>

              <label style={{
                display: "block",
                padding: "20px",
                border: "2px dashed #E5E7EB",
                borderRadius: "12px",
                marginBottom: "12px",
                cursor: "pointer",
                background: "#F9FAFB",
                transition: "all 0.25s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#2563EB';
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.03)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.background = '#F9FAFB';
              }}>
                <input
                  type="file"
                  accept="image/*"
                  capture
                  hidden
                  onChange={handleImageChange}
                />
                <h6 style={{ margin: 0, marginBottom: '4px', color: '#111827', fontWeight: 600 }}>Take Photo with Camera</h6>
                <small style={{ color: '#6B7280' }}>
                  Capture fresh photo of your food donation
                </small>
              </label>

              <label style={{
                display: "block",
                padding: "20px",
                border: "2px dashed #E5E7EB",
                borderRadius: "12px",
                cursor: "pointer",
                background: "#F9FAFB",
                transition: "all 0.25s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#2563EB';
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.03)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.background = '#F9FAFB';
              }}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
                <h6 style={{ margin: 0, marginBottom: '4px', color: '#111827', fontWeight: 600 }}>Upload from Gallery</h6>
                <small style={{ color: '#6B7280' }}>
                  Choose existing photos from your device
                </small>
              </label>

              {images.length > 0 && (
                <>
                  <div className="row mt-4 g-2">
                    {images.map((image, index) => (
                      <div className="col-4 col-sm-3" key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt="food"
                          className="img-fluid"
                          style={{
                            borderRadius: "12px",
                            height: "120px",
                            width: "100%",
                            objectFit: "cover",
                            boxShadow: "0 4px 12px rgba(15,23,42,0.08)"
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between mt-4 gap-3">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setImages([])}
                      style={{
                        flex: 1,
                        background: 'white',
                        color: '#2563EB',
                        border: '1px solid #E5E7EB',
                        fontWeight: 600
                      }}
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      className="btn btn-success"
                      style={{ flex: 1 }}
                    >
                      Done ({images.length})
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                border: "none",
                backgroundColor: loading ? "#9CA3AF" : "#2563EB",
                color: "white",
                padding: "14px 20px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "all 0.25s ease"
              }}
              onMouseOver={(e) => !loading && (e.target.style.background = "#1D4ED8")}
              onMouseOut={(e) => !loading && (e.target.style.background = "#2563EB")}
            >
              {loading ? "Posting..." : "✓ Post Donation"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddDonation;