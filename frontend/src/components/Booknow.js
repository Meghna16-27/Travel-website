import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const Booknow = () => {
  const navigate = useNavigate();
  const location = useLocation();//This line is a React Router hook that allows you to access information about the current route — particularly the URL and anything passed via navigation (like state)

  const destinationTitle = location.state?.title || '';
  const destinationImage = location.state?.img || '';
  const destinationDescription = location.state?.description || '';//You're extracting values passed from another page using location.state.
  const baseCost = location.state?.cost ?? null;

  const loggedInFirstName = localStorage.getItem("firstName");
  const loggedInEmail = localStorage.getItem("email");


  useEffect(() => {
      console.log("LocalStorage lastName:", localStorage.getItem("lastName"));
    if (!loggedInFirstName || !loggedInEmail) {
      alert("Please log in to book.");
      navigate("/login");
    }
}, [loggedInFirstName, loggedInEmail, navigate]);


  const [user, setUser] = useState({
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    adult: 0,
    child: 0,
    old: 0,
    food: "",
    from: "kolkata",
    to: destinationTitle,
    cost:0
  });
  console.log("Initial lastName:", user.lastName);

  useEffect(() => {
    if (user.lastName) {
      localStorage.setItem('lastName', user.lastName);
    }
  }, [user.lastName]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: ["adult", "child", "old"].includes(name) ? parseInt(value) || 0 : value
    }));
  };

  const totalTravelers = user.adult + user.child + user.old;
  const totalCost = baseCost ? baseCost * totalTravelers : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        ...user,
        firstName: loggedInFirstName,
        lastName: user.lastName,
        email: loggedInEmail,
        title: destinationTitle,
        cost: totalCost
      };

      await axios.post("http://localhost:4000/bookings", bookingData);
      alert("Booking successful!");
      navigate("/payment");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-md-10">
          <div className="card shadow-lg p-4 rounded">
            <h3 className="text-center mb-4">BOOK NOW</h3>

            <div className="text-center mb-4">
              <h4>Destination: {destinationTitle}</h4>
              {destinationImage && (
                <img
                  src={destinationImage}
                  alt={destinationTitle}
                  style={{ maxHeight: "200px" }}
                  className="img-fluid rounded shadow"
                />
              )}
              <p className="mt-2">{destinationDescription}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6 mb-3">
                  <label>First Name</label>
                  <input value={loggedInFirstName} readOnly className="form-control" />
                </div>
                <div className="col-6 mb-3">
                  <label>Last Name</label>
                  <input  onChange={handleChange}   name="lastName" type="text" className="form-control" required />
                </div>
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label>Phone</label>
                  <input onChange={handleChange} name="phone" type="text" className="form-control" required />
                </div>
                <div className="col-6 mb-3">
                  <label>Email</label>
                  <input value={loggedInEmail} readOnly className="form-control" />
                </div>
              </div>

              <div className="mb-3">
                <label>Address</label>
                <input onChange={handleChange} name="address" type="text" className="form-control" required />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label>City</label>
                  <input onChange={handleChange} name="city" type="text" className="form-control" required />
                </div>
                <div className="col-md-4">
                  <label>State</label>
                  <input onChange={handleChange} name="state" type="text" className="form-control" required />
                </div>
                <div className="col-md-2">
                  <label>Pincode</label>
                  <input onChange={handleChange} name="pin" type="text" className="form-control" required />
                </div>
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label>From</label>
                  <input name="from" value="kolkata" readOnly className="form-control" />
                </div>
                <div className="col-6 mb-3">
                  <label>To</label>
                  <input name="to" value={destinationTitle} readOnly className="form-control" />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3">
                  <label>No. of Adults</label>
                  <input onChange={handleChange} name="adult" type="number" min="0" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label>No. of Children</label>
                  <input onChange={handleChange} name="child" type="number" min="0" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label>No. of Senior Citizens</label>
                  <input onChange={handleChange} name="old" type="number" min="0" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label>Food</label>
                  <select onChange={handleChange} name="food" className="form-control" required>
                    <option value="">Choose...</option>
                    <option value="Veg">Veg</option>
                    <option value="NonVeg">NonVeg</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label>Estimated Cost:</label>
                <input
                  type="text"
                  className="form-control"
                  name="cost"
                  value={
                    totalCost !== null
                      ? `₹${totalCost.toLocaleString()} (approx)`
                      : "Cost unavailable"
                  }
                  readOnly
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">Book Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booknow;