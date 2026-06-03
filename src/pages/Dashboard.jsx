import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {

    const [stats, setStats] = useState({
        totalDonations: 0,
        availableFood: 0,
        totalUsers: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {

            const response = await getDashboardStats();

            console.log("Dashboard API Response:", response.data);

            setStats({
                totalDonations: response.data.totalDonations || 0,
                availableFood: response.data.availableFood || 0,
                totalUsers: response.data.totalUsers || 0
            });

        } catch (error) {

            console.error("Dashboard API Error:", error);

        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Food Rescue Dashboard
                </h2>

                <div className="row g-4">

                    <DashboardCard
                        title="Total Donations"
                        count={stats.totalDonations}
                    />

                    <DashboardCard
                        title="Available Food"
                        count={stats.availableFood}
                    />

                    <DashboardCard
                        title="Registered Users"
                        count={stats.totalUsers}
                    />

                </div>

                <div className="card mt-5 shadow">

                    <div className="card-body">

                        <h4>Mission</h4>

                        <p>
                            Reduce food waste by connecting food donors
                            with NGOs and volunteers who can distribute
                            food to people in need.
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;