import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllPickupRequests } from "../services/pickupService";

function PickupRequests() {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {

        try {

            const response = await getAllPickupRequests();

            setRequests(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <>
            <Navbar />

            <div className="page-container">
                <div className="page-header" style={{ marginBottom: '40px' }}>
                    <h1>📦 Pickup Requests</h1>
                    <p className="subtitle">Manage and track all food pickup requests.</p>
                </div>

                {requests.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        background: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 8px 24px rgba(15,23,42,0.08)'
                    }}>
                        <p style={{ fontSize: '18px', color: '#6B7280', margin: 0 }}>
                            📭 No pickup requests found. Start by requesting a pickup from available donations!
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {requests.map((request) => (
                            <div
                                key={request.id}
                                style={{
                                    background: "white",
                                    borderRadius: "12px",
                                    padding: "20px",
                                    boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                                    border: "1px solid #E5E7EB",
                                    transition: "all 0.25s ease",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(15,23,42,0.1)";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.08)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <div>
                                    <h4 style={{ margin: "0 0 8px 0", color: "#111827", fontWeight: 700 }}>
                                        📍 Pickup Request #{request.id}
                                    </h4>
                                    <p style={{ margin: "0", color: "#6B7280", fontSize: '14px' }}>
                                        Donation ID: <span style={{ fontWeight: 500, color: '#111827' }}>{request.donation?.id || 'N/A'}</span>
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    {request.status === 'PENDING' && (
                                        <span className="badge badge-warning" style={{ padding: '8px 12px', fontSize: '12px' }}>⏳ {request.status}</span>
                                    )}
                                    {request.status === 'COMPLETED' && (
                                        <span className="badge badge-success" style={{ padding: '8px 12px', fontSize: '12px' }}>✓ {request.status}</span>
                                    )}
                                    {request.status === 'CANCELLED' && (
                                        <span className="badge badge-danger" style={{ padding: '8px 12px', fontSize: '12px' }}>✕ {request.status}</span>
                                    )}
                                    {!['PENDING', 'COMPLETED', 'CANCELLED'].includes(request.status) && (
                                        <span className="badge badge-info" style={{ padding: '8px 12px', fontSize: '12px' }}>{request.status}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    );
}

export default PickupRequests;