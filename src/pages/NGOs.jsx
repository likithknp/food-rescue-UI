import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function NGOs() {

  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const ngos = [
    {
      id: 1,
      name: "Helping Hands NGO",
      city: "Bangalore"
    },
    {
      id: 2,
      name: "Food For All",
      city: "Hyderabad"
    }
  ];

  useEffect(() => {
    getCurrentLocation();
  }, []);

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
        console.error(err);
        setError("Location permission denied");
      }
    );
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid" style={{ padding: "15px" }}>

        <h2 className="mb-4" style={{ marginTop: "10px" }}>Nearby NGOs</h2>

        {location && (
          <div className="alert alert-success">
            <strong>Current Location</strong>
            <br />
            Latitude: {location.latitude}
            <br />
            Longitude: {location.longitude}
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="row g-3">

          {ngos.map((ngo) => (

            <div
              className="col-12 col-sm-6 col-md-4"
              key={ngo.id}
            >

              <div className="card shadow h-100">

                <div className="card-body">

                  <h5>{ngo.name}</h5>

                  <p className="text-muted">
                    {ngo.city}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default NGOs;