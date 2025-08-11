import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", user);
      console.log("Login Response:", response.data);

      // Save values to localStorage
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("email", response.data.email);
      window.dispatchEvent(new Event("storage"));

      alert(response.data.message);
      setLoggedIn(true); // Mark user as logged in

      // Navigate based on token
      if (response.data.token === "admin-token") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 rounded">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <p className="mt-3 text-center">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>

            {/*  Show Admin Button Only if Logged in AND Admin */}
            {loggedIn && localStorage.getItem("token") === "admin-token" && (
              <div className="text-center mt-3">
                <Link to="/admin" className="btn btn-success">
                  Go to Admin Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
