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
          <h2
            style={{
              fontWeight: "700",
              marginBottom: "25px",
              color: "#166534",
            }}
          >
            Add Food Donation
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Food Type
              </label>

              <select
                className="form-select"
                name="foodName"
                value={donation.foodName}
                onChange={handleChange}
                required
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                }}
              >
                <option value="">Select food type</option>
                <option value="Cooked Food">Cooked Food</option>
                <option value="Packed Food">Packed Food</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Bakery Items">Bakery Items</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
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
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Expiry Date
              </label>

              <input
                type="date"
                name="expiryTime"
                className="form-control"
                value={donation.expiryTime}
                onChange={handleChange}
                required
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
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
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                }}
              />

              <button
                type="button"
                onClick={useCurrentLocation}
                style={{
                  marginTop: "12px",
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
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Description (Optional)
              </label>

              <textarea
                rows="4"
                name="description"
                className="form-control"
                placeholder="Add any special instructions or details"
                value={donation.description}
                onChange={handleChange}
                style={{
                  borderRadius: "12px",
                  padding: "14px",
                }}
              />
            </div>

            <div className="mb-4">
              <label
                className="form-label fw-semibold"
                style={{ marginBottom: "15px" }}
              >
                Upload Food Photos
              </label>

              <label
                style={{
                  display: "block",
                  padding: "18px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "16px",
                  marginBottom: "15px",
                  cursor: "pointer",
                  background: "#fafafa",
                }}
              >
                <input
                   type="file"
                   accept="image/*"
                   capture
                   hidden
                   onChange={handleImageChange}
                />

                <h6>📷 Take Photo</h6>

                <small className="text-muted">
                  Use camera to capture food
                </small>
              </label>

              <label
                style={{
                  display: "block",
                  padding: "18px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "16px",
                  cursor: "pointer",
                  background: "#fafafa",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageChange}
                />

                <h6>🖼 Upload from Gallery</h6>

                <small className="text-muted">
                  Choose existing photos
                </small>
              </label>

              {images.length > 0 && (
                <>
                  <div className="row mt-4">
                    {images.map((image, index) => (
                      <div className="col-4 mb-3" key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt="food"
                          className="img-fluid"
                          style={{
                            borderRadius: "14px",
                            height: "120px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setImages([])}
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      className="btn btn-success"
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
                backgroundColor: "#16a34a",
                color: "white",
                padding: "16px",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Posting..." : "Post Donation"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddDonation;