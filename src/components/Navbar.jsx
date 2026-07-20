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

    const handleMobileNav = (path) => {
        try {
            // close offcanvas if open
            const closeBtn = document.querySelector('#mobileMenu .btn-close');
            if (closeBtn) closeBtn.click();
        } catch (e) {}
        navigate(path);
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
                                    <button type="button" className="nav-link text-white py-2 btn btn-link" onClick={() => handleMobileNav('/login')}>Login</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link" onClick={() => handleMobileNav('/register')}>Register</button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link" onClick={() => handleMobileNav('/dashboard')}>Dashboard</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link" onClick={() => handleMobileNav('/add-donation')}>Donate Food</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link" onClick={() => handleMobileNav('/donations')}>Available Food</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link" onClick={() => handleMobileNav('/ngos')}>NGOs</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link" onClick={() => handleMobileNav('/view-emergency-requests')}>Emergency Requests</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link" onClick={() => handleMobileNav('/profile')}>Profile</button>
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