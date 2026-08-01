import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createNgo } from "../services/ngoService";

function AddNGO() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [ngo, setNgo] = useState({
    ngoName: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    latitude: null,
    longitude: null,
  });

  const handleChange = (e) => {
    setNgo({
      ...ngo,
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

          setNgo((prev) => ({
            ...prev,
            address: data.display_name || prev.address,
            latitude: lat,
            longitude: lng,
          }));
        } catch (error) {
          console.error(error);
          setNgo((prev) => ({ ...prev, latitude: lat, longitude: lng }));
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

    if (!ngo.ngoName || !ngo.contactPerson || !ngo.phone || !ngo.email || !ngo.address) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const ngoPayload = {
        ngoName: ngo.ngoName,
        contactPerson: ngo.contactPerson,
        phone: ngo.phone,
        email: ngo.email,
        address: ngo.address,
        latitude: ngo.latitude,
        longitude: ngo.longitude,
        verified: false,
      };

      const response = await createNgo(ngoPayload);

      alert("NGO registration submitted successfully!");

      setNgo({ ngoName: "", contactPerson: "", phone: "", email: "", address: "", latitude: null, longitude: null });

      navigate("/ngos");
    } catch (error) {
      console.error("Error creating NGO:", error);
      const msg = error?.response?.data?.message || error?.response?.data || error.message || "Failed to register NGO";
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
              🏢 Register New NGO
            </h1>
            <p style={{ margin: '8px 0 0 0', color: '#6B7280', fontSize: '15px' }}>
              Register your organization to receive and distribute rescued food.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">NGO / Organization Name</label>
              <input type="text" name="ngoName" className="form-control" placeholder="e.g., Helping Hands" value={ngo.ngoName} onChange={handleChange} required style={{ padding: "12px 14px", borderRadius: "10px" }} />
            </div>

            <div className="mb-4">
              <label className="form-label">Contact Person</label>
              <input type="text" name="contactPerson" className="form-control" placeholder="Full name of contact" value={ngo.contactPerson} onChange={handleChange} required style={{ padding: "12px 14px", borderRadius: "10px" }} />
            </div>

            <div className="mb-4">
              <label className="form-label">Phone</label>
              <input type="tel" name="phone" className="form-control" placeholder="Phone number" value={ngo.phone} onChange={handleChange} required style={{ padding: "12px 14px", borderRadius: "10px" }} />
            </div>

            <div className="mb-4">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" placeholder="contact@ngo.org" value={ngo.email} onChange={handleChange} required style={{ padding: "12px 14px", borderRadius: "10px" }} />
            </div>

            <div className="mb-4">
              <label className="form-label">Address</label>
              <input type="text" name="address" className="form-control" placeholder="Street, city, state" value={ngo.address} onChange={handleChange} required style={{ padding: "12px 14px", borderRadius: "10px" }} />

              <button type="button" onClick={useCurrentLocation} style={{
                marginTop: "12px",
                border: "none",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                color: "#22C55E",
                padding: "12px 18px",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
              }}>
                📍 Use Current Location
              </button>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%",
              border: "none",
              backgroundColor: loading ? "#9CA3AF" : "#2563EB",
              color: "white",
              padding: "14px 20px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
            }}>
              {loading ? "Submitting..." : "✓ Register NGO"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNGO;

