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

            <div className="container-fluid" style={{ padding: "15px" }}>

                <h2 style={{ marginTop: "10px" }}>Available Food Donations</h2>

                <div className="row g-3">

                    {donations.length === 0 ? (
                        <div className="col-12">
                            <div className="alert alert-info">
                                No food donations available.
                            </div>
                        </div>
                    ) : (
                        donations.map((food) => (
                            <div
                                className="col-12 col-sm-6 col-md-4"
                                key={food.id}
                            >
                                <div className="card shadow">

                                    <div className="card-body">

                                        <h5>
                                            {food.foodName}
                                        </h5>

                                        <p>
                                            Quantity: {food.quantity}
                                        </p>

                                        <p>
                                            Location: {food.pickupLocation}
                                        </p>

                                        <button
                                            className="btn btn-success"
                                            onClick={() => requestPickup(food)}
                                        >
                                            Request Pickup
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))
                    )}

                </div>

            </div>
        </>
    );
}

export default Donations;