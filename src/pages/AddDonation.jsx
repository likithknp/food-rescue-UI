import { useState } from "react";
import Navbar from "../components/Navbar";
import { createDonation } from "../services/donationService";

function AddDonation() {

    const [donation, setDonation] = useState({
        foodName: "",
        quantity: "",
        description: "",
        imageUrl: "",
        expiryTime: "",
        status: "AVAILABLE",
        pickupLocation: ""
    });

    const handleChange = (e) => {

        setDonation({
            ...donation,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createDonation(donation);

            alert("Food Donation Added Successfully");

            setDonation({
                foodName: "",
                quantity: "",
                description: "",
                imageUrl: "",
                expiryTime: "",
                status: "AVAILABLE",
                pickupLocation: ""
            });

        } catch (error) {

            console.error(error);

            alert("Failed To Save Donation");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card shadow p-4">

                    <h2 className="mb-4">
                        Donate Food
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                Food Name
                            </label>

                            <input
                                type="text"
                                name="foodName"
                                className="form-control"
                                value={donation.foodName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Quantity
                            </label>

                            <input
                                type="text"
                                name="quantity"
                                className="form-control"
                                value={donation.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                name="description"
                                className="form-control"
                                rows="3"
                                value={donation.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Image URL
                            </label>

                            <input
                                type="text"
                                name="imageUrl"
                                className="form-control"
                                value={donation.imageUrl}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Expiry Time
                            </label>

                            <input
                                type="datetime-local"
                                name="expiryTime"
                                className="form-control"
                                value={donation.expiryTime}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Pickup Location
                            </label>

                            <input
                                type="text"
                                name="pickupLocation"
                                className="form-control"
                                value={donation.pickupLocation}
                                onChange={handleChange}
                                placeholder="Enter pickup location"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Submit Donation
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}

export default AddDonation;