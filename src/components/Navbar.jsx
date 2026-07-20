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
        <nav className="navbar navbar-dark bg-success sticky-top">

            <div className="container-fluid">

                <Link className="navbar-brand fw-bold" to="/">
                    Food Rescue
                </Link>

                {/* Mobile: offcanvas toggle */}
                <button
                    className="btn btn-outline-light d-md-none"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobileMenu"
                    aria-controls="mobileMenu"
                    aria-label="Open menu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Desktop nav (visible on md and up) */}
                <div className="d-none d-md-flex navbar-nav ms-auto">
                    {!isLoggedIn ? (
                        <>
                            <Link className="nav-link text-white" to="/login">Login</Link>
                            <Link className="nav-link text-white" to="/register">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                            <Link className="nav-link text-white" to="/add-donation">Donate Food</Link>
                            <Link className="nav-link text-white" to="/donations">Available Food</Link>
                            <Link className="nav-link text-white" to="/ngos">NGOs</Link>
                            <Link className="nav-link text-white" to="/view-emergency-requests">Emergency Requests</Link>
                            <Link className="nav-link text-white" to="/profile">Profile</Link>
                            <button className="btn btn-outline-light ms-2" onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>

                {/* Offcanvas mobile menu (shows on small screens) */}
                <div className="offcanvas offcanvas-end text-bg-success" tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="mobileMenuLabel">Food Rescue</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="navbar-nav">
                            {!isLoggedIn ? (
                                <>
                                    <Link className="nav-link text-white py-2" to="/login" data-bs-dismiss="offcanvas">Login</Link>
                                    <Link className="nav-link text-white py-2" to="/register" data-bs-dismiss="offcanvas">Register</Link>
                                </>
                            ) : (
                                <>
                                    <Link className="nav-link text-white py-2" to="/dashboard" data-bs-dismiss="offcanvas">Dashboard</Link>
                                    <Link className="nav-link text-white py-2" to="/add-donation" data-bs-dismiss="offcanvas">Donate Food</Link>
                                    <Link className="nav-link text-white py-2" to="/donations" data-bs-dismiss="offcanvas">Available Food</Link>
                                    <Link className="nav-link text-white py-2" to="/ngos" data-bs-dismiss="offcanvas">NGOs</Link>
                                    <Link className="nav-link text-white py-2" to="/view-emergency-requests" data-bs-dismiss="offcanvas">Emergency Requests</Link>
                                    <Link className="nav-link text-white py-2" to="/profile" data-bs-dismiss="offcanvas">Profile</Link>
                                    <div className="mt-3">
                                        <button className="btn btn-outline-light w-100" onClick={() => { try { handleLogout(); document.querySelector('#mobileMenu .btn-close')?.click(); } catch(e){} }}>Logout</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>

        </nav>
    );
}

export default Navbar;