import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/tokenUtil";
import { useState, useEffect } from "react";

function Navbar() {

    const navigate = useNavigate();

    // read both explicit stored user object and auth token
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        try {
            const user = localStorage.getItem("user");
            const token = getToken();
            return Boolean(user || token);
        } catch {
            return false;
        }
    });

    // Keep login state in sync when other tabs update localStorage
    useEffect(() => {
        const onStorage = () => {
            try {
                const user = localStorage.getItem("user");
                const token = getToken();
                setIsLoggedIn(Boolean(user || token));
            } catch {
                setIsLoggedIn(false);
            }
        };
        window.addEventListener("storage", onStorage);
        // listen for custom auth-change events dispatched on successful login/logout in same tab
        window.addEventListener("auth-change", onStorage);
        return () => {
            window.removeEventListener("storage", onStorage);
            window.removeEventListener("auth-change", onStorage);
        };
    }, []);

    const handleLogout = () => {
        try {
            localStorage.removeItem("user");
            removeToken();
        } catch {}

        alert("Logged Out Successfully");

        navigate("/login");
        try { window.dispatchEvent(new Event('auth-change')); } catch(e){}
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">

            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    Food Rescue
                </Link>

                <div className="navbar-nav ms-auto">

                    {!isLoggedIn ? (
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