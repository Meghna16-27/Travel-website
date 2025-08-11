import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [fname, setFname] = useState(localStorage.getItem("firstName"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const updateUser = () => {
      setToken(localStorage.getItem("token"));
      setFname(localStorage.getItem("firstName") || "");
      setEmail(localStorage.getItem("email") || "");
    };
    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  // Fetch all destinations for search
  useEffect(() => {
    axios.get("http://localhost:4000/destinations")
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error("Failed to load destinations", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const match = destinations.find(dest =>
      dest.title.toLowerCase().includes(search.toLowerCase())
    );

    if (match) {
      navigate(`/destination/${match._id}`);
    } else {
      alert("Package is not available.");
    }
  };

  const handleLogout = async () => {
    try {
      if (email) {
        await axios.post("http://localhost:4000/logout", { email });
      }
    } catch (error) {
      console.error("Logout API failed:", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("email");

    setToken(null);
    setFname(null);
    setEmail(null);
    navigate("/login");
  };

  const handleRedirect = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom sticky-top">
      <div className="container-fluid">
       <Link to="/" className="navbar-brand">
      <img src="/img/logoG2.png" style={{ height: "60px" }} alt="logo" />
    </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left Navigation */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
           </ul>

          {/* Center - Search Bar */}
          <form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
            <input className="form-control rounded-pill px-4 me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button className="btn btn-outline-success rounded-pill px-4" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>

          {/* Right Side - Login / Logout */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    Welcome, {fname ? fname : "Guest"}
                  </span>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <button className="btn btn-sm btn-danger rounded-pill px-4 py-2 " onClick={handleLogout}>
                      Logout
                    </button>
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <button className="btn btn-warning dropdown-toggle rounded-pill px-4 py-2" id="loginDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Login
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={() => handleRedirect('user')}>
                      User
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleRedirect('admin')}>
                      Admin
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
            {/* Admin-only button */}
            {token === "admin-token" && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  <button className="btn btn-sm btn-primary rounded-pill px-4 py-2 ">
                    Admin
                  </button>
                </Link>
              </li>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Header;