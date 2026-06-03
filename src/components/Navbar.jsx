import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("user");

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