import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await registerUser(formData);

            alert("Registration Successful");

            setFormData({
                fullName: "",
                email: "",
                mobileNumber: "",
                password: ""
            });

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Registration Failed"
            );
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Food Rescue Registration
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                fullName: e.target.value
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Mobile Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.mobileNumber}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                mobileNumber: e.target.value
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    className="btn btn-success w-100"
                                    type="submit"
                                >
                                    Register
                                </button>

                            </form>

                            <p className="text-center mt-3">
                                Already have an account?{" "}
                                <Link to="/login">
                                    Login
                                </Link>
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;