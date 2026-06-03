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

            <div className="container mt-4">

                <h2>Pickup Requests</h2>

                <table className="table table-bordered">

                    <thead>
                        <tr>
                            <th>Donation ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="2">
                                    No pickup requests found
                                </td>
                            </tr>
                        ) : (
                            requests.map((request) => (
                                <tr key={request.id}>
                                    <td>
                                        {request.donation?.id}
                                    </td>
                                    <td>
                                        {request.status}
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default PickupRequests;