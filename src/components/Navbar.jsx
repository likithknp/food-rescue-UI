import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/tokenUtil";
import { useState, useEffect } from "react";

function Navbar() {

    const navigate = useNavigate();
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

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
        setIsOffcanvasOpen(false);
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
                    onClick={() => setIsOffcanvasOpen(!isOffcanvasOpen)}
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
                <div className={`offcanvas offcanvas-end text-bg-success ${isOffcanvasOpen ? 'show' : ''}`} tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel" style={{ visibility: isOffcanvasOpen ? 'visible' : 'hidden' }}>
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="mobileMenuLabel">Food Rescue</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={() => setIsOffcanvasOpen(false)} aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body text-start">
                        <div className="navbar-nav w-100">
                            {!isLoggedIn ? (
                                <>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link text-start" onClick={() => handleMobileNav('/login')}>Login</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link text-start" onClick={() => handleMobileNav('/register')}>Register</button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link text-start" onClick={() => handleMobileNav('/dashboard')}>Dashboard</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link text-start" onClick={() => handleMobileNav('/add-donation')}>Donate Food</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link text-start" onClick={() => handleMobileNav('/donations')}>Available Food</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link text-start" onClick={() => handleMobileNav('/ngos')}>NGOs</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link text-start" onClick={() => handleMobileNav('/view-emergency-requests')}>Emergency Requests</button>
                                    <button type="button" className="nav-link text-white py-2 btn btn-link text-start" onClick={() => handleMobileNav('/profile')}>Profile</button>
                                    <div className="mt-3">
                                        <button className="btn btn-outline-light w-100" onClick={() => { setIsOffcanvasOpen(false); handleLogout(); }}>Logout</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Backdrop overlay for offcanvas */}
                {isOffcanvasOpen && <div className="offcanvas-backdrop fade show" onClick={() => setIsOffcanvasOpen(false)}></div>}

            </div>

        </nav>
    );
}

export default Navbar;