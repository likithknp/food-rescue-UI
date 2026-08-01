import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllNgos } from "../services/ngoService";

function NGOs() {

  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentLocation();
    fetchNgos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNgos = async () => {
    setLoading(true);
    try {
      const res = await getAllNgos();
      // backend returns array of NGOs in res.data
      setNgos(res.data || []);
    } catch (err) {
      console.error("Failed to load NGOs:", err);
      setError("Unable to load NGOs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        setLocation({
          latitude,
          longitude
        });

      },
      (err) => {
        console.error("Geolocation error:", err);
        if (err.code === err.PERMISSION_DENIED) {
          setError("Location permission denied. Please enable location access in browser settings.");
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError("Location information is unavailable.");
        } else if (err.code === err.TIMEOUT) {
          setError("Location request timed out. Please try again.");
        } else {
          setError("Unable to fetch location. Please enable location access in your browser.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="page-header" style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <h1>🏢 Nearby NGOs & Organizations</h1>
            <p className="subtitle">Connect with organizations dedicated to reducing food waste and helping communities.</p>
          </div>
          <div>
            <a href="/add-ngo" className="btn btn-primary">+ Register NGO</a>
          </div>
        </div>

        {location && (
          <div className="alert alert-info mb-5" style={{ marginBottom: '40px' }}>
            <strong style={{ color: '#2563EB', fontWeight: 600 }}>📍 Your Location</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Latitude: <span style={{ fontWeight: 500 }}>{location.latitude.toFixed(4)}</span> | Longitude: <span style={{ fontWeight: 500 }}>{location.longitude.toFixed(4)}</span></p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mb-5">
            <strong>⚠️ {error}</strong>
          </div>
        )}

        <div className="row g-4">
          {loading ? (
            <div className="col-12">
              <div className="card p-4" style={{ textAlign: 'center' }}>Loading NGOs...</div>
            </div>
          ) : ngos.length > 0 ? (
            ngos.map((ngo) => (
              <div
                className="col-12 col-sm-6 col-lg-4"
                key={ngo.id}
                style={{ marginBottom: '16px' }}
              >
                <div className="card h-100" style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}>
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <h5 style={{ margin: 0, marginBottom: '8px', fontSize: '18px', fontWeight: 700, color: '#111827' }}>
                        {ngo.ngoName || ngo.name}
                      </h5>
                      <p style={{ margin: 0, color: '#6B7280', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        📍 {ngo.address || ngo.city || '—'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <span className="badge badge-success" style={{ marginRight: 'auto' }}>{ngo.verified ? '✓ Verified' : 'Pending'}</span>
                      <span className="badge badge-info">Learn more →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(15,23,42,0.08)'
              }}>
                <p style={{ fontSize: '18px', color: '#6B7280', margin: 0 }}>
                  🔍 No NGOs found. You can <a href="/add-ngo">register an NGO</a>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NGOs;