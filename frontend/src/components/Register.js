import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState ({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
const navigate= useNavigate();
    const handleChange =(e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //for not submitting empty form
        try {
            const response = await axios.post("http://localhost:4000/register", user);
            alert(response.data.message);
              navigate('/login');
        } catch(error) {
            console.error("Error:", error);
            alert("Registration failed!");
            
        }
    }

    return(
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4 rounded">
                        <h3 className="text-center mb-4">User Registration</h3>
                        <form onSubmit={handleSubmit} name="registrationForm" action="register" method="post">
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label className="form-label">First Name</label>
                                        <input onChange={handleChange} type="text" className="form-control" name="firstName" id="fname" placeholder="Enter firstname" required/>
                                        <p id="fname-error" className="error-message"></p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label className="form-label">Last Name</label>
                                        <input onChange={handleChange} type="text" className="form-control" name="lastName" id="lname" placeholder="Enter lastname" required/>                                        <p id="lname-error" className="error-message"></p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input onChange={handleChange} type="email" className="form-control" name="email" id="email" placeholder="Enter your email" required/>
                                <p id="email-error" className="error-message"></p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input onChange={handleChange} type="password" className="form-control" name="password" id="password" placeholder="Enter your password" required/>
                                <p id="password-error" className="error-message"></p>
                            </div>
                            <p>Already a registered user?<Link className="link" to="/login"> Sign in</Link> from here</p>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;