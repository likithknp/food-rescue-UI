import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAvailableDonations } from "../services/donationService";
import { createPickupRequest } from "../services/pickupService";

function Donations() {

    const [donations, setDonations] = useState([]);

    useEffect(() => {
        loadDonations();
    }, []);

    const loadDonations = async () => {
        try {
            const response = await getAvailableDonations();
            setDonations(response.data);
        } catch (error) {
            console.error("Error loading donations:", error);
        }
    };

    const requestPickup = async (donation) => {

        try {

            await createPickupRequest({
                donation: {
                    id: donation.id
                },
                ngo: null,
                status: "PENDING"
            });

            alert("Pickup request submitted successfully");

        } catch (error) {

            console.error(error);

            alert("Failed to submit pickup request");
        }
    };

    return (
        <>
            <Navbar />

            <div className="page-container">
                <div className="page-header" style={{ marginBottom: '40px' }}>
                    <h1>🍽️ Available Food Donations</h1>
                    <p className="subtitle">Browse available food donations and request pickups for your organization.</p>
                </div>

                {donations.length === 0 ? (
                    <div className="alert alert-info" style={{ marginBottom: '40px' }}>
                        <strong>ℹ️ No Donations Available</strong>
                        <p style={{ margin: '8px 0 0 0' }}>No food donations are currently available. Please check back soon!</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {donations.map((food) => (
                            <div
                                className="col-12 col-sm-6 col-lg-4"
                                key={food.id}
                            >
                                <div className="card" style={{ cursor: 'pointer', transition: 'all 0.25s ease', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h4 style={{ margin: '0 0 8px 0', color: '#111827', fontSize: '18px', fontWeight: 700 }}>
                                            🍖 {food.foodName}
                                        </h4>

                                        <div style={{ marginBottom: '16px', flex: 1 }}>
                                            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6B7280' }}>
                                                <strong style={{ color: '#111827' }}>📦 Quantity:</strong> {food.quantity}
                                            </p>

                                            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6B7280' }}>
                                                <strong style={{ color: '#111827' }}>📍 Location:</strong> {food.pickupLocation}
                                            </p>

                                            {food.description && (
                                                <p style={{ margin: '0', fontSize: '14px', color: '#6B7280', fontStyle: 'italic' }}>
                                                    <strong style={{ color: '#111827' }}>💬 Details:</strong> {food.description}
                                                </p>
                                            )}
                                        </div>

                                        <span className="badge badge-success" style={{ alignSelf: 'flex-start', marginBottom: '16px' }}>
                                            ✓ {food.status || 'AVAILABLE'}
                                        </span>
                                    </div>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => requestPickup(food)}
                                        style={{ width: '100%' }}
                                    >
                                        Request Pickup →
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    );
}

export default Donations;