import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Check for user in localStorage on component mount and when auth state changes
    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem("user");
            setUser(storedUser ? JSON.parse(storedUser) : null);
        };

        // Load user on mount
        loadUser();

        // Listen for storage changes (from other tabs)
        const handleStorageChange = () => {
            loadUser();
        };

        // Listen for custom auth state change events (from same tab)
        const handleAuthStateChanged = () => {
            loadUser();
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("authStateChanged", handleAuthStateChanged);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("authStateChanged", handleAuthStateChanged);
        };
    }, []);

    const handleLogout = () => {

        localStorage.removeItem("user");

        // Dispatch custom event to notify other components of auth state change
        window.dispatchEvent(new Event('authStateChanged'));

        alert("Logged Out Successfully");

        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">

            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    Food Rescue
                </Link>

                <div className="navbar-nav ms-auto">

                    {!user ? (
                        <>
                            <Link
                                className="nav-link text-white"
                                to="/login"
                            >
                                Login
                            </Link>

                            <Link
                                className="nav-link text-white"
                                to="/register"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                className="nav-link text-white"
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>

                            <Link
                                className="nav-link text-white"
                                to="/add-donation"
                            >
                                Donate Food
                            </Link>

                            <Link
                                className="nav-link text-white"
                                to="/donations"
                            >
                                Available Food
                            </Link>

                            <Link
                                className="nav-link text-white"
                                to="/ngos"
                            >
                                NGOs
                            </Link>

                            <Link
                                className="nav-link text-white"
                                to="/profile"
                            >
                                Profile
                            </Link>

                            <button
                                className="btn btn-outline-light ms-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;