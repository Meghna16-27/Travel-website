import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Admin() {
  const [activeSection, setActiveSection] = useState('');
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (activeSection === 'users') {
      axios.get("http://localhost:4000/registers")
        .then(response => setUsers(response.data))
        .catch(error => console.error("Error fetching users", error));
    }

    if (activeSection === 'tours') fetchTours();
    if (activeSection === 'contacts') fetchContacts();
    if (activeSection === 'bookings') fetchBookings();
  }, [activeSection]);

  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:4000/destinations");
      setTours(res.data);
    } catch (err) {
      console.error("Error fetching tours", err);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        await axios.delete(`http://localhost:4000/destinations/${id}`);
        setTours(prev => prev.filter(t => t._id !== id));
      } catch (error) {
        console.error("Error deleting tour:", error);
      }
    }
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:4000/bookings/${id}`);
        setBookings(prev => prev.filter(b => b._id !== id));
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-12 col-md-2 bg-primary text-white min-vh-100 py-4 px-3">
          <h5 className="text-center text-md-start">Admin Panel</h5>
          <hr className="bg-white" />
          <button className="btn btn-light w-100 my-2" onClick={() => setActiveSection('users')}>Users</button>
          <button className="btn btn-light w-100 my-2" onClick={() => setActiveSection('tours')}>Tours</button>
          <button className="btn btn-light w-100 my-2" onClick={() => setActiveSection('contacts')}>Contacts</button>
          <button className="btn btn-light w-100 my-2" onClick={() => setActiveSection('bookings')}>Bookings</button>
        </div>

        {/* Main Content */}
        <div className="col py-4 px-3">
          <h2 className="mb-4 text-center text-md-start">Welcome to Admin Panel</h2>

          {/* Users Section */}
          {activeSection === 'users' && (
            <div className="table-responsive">
              <h4>User List</h4>
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Login Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.loginDuration !== undefined
                          ? `${Math.floor(user.loginDuration / 3600)} hrs ${Math.floor((user.loginDuration % 3600) / 60)} mins ${user.loginDuration % 60} secs`
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tours Section */}
          {activeSection === 'tours' && (
            <div className="table-responsive">
              <h4>Tour List</h4>
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Title</th>
                    <th>Img1</th>
                    <th>Img2</th>
                    <th>Img3</th>
                    <th>Img4</th>
                    <th>Img6</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map(tour => (
                    <tr key={tour._id}>
                      <td>{tour.title}</td>
                      <td><img src={tour.img1} alt="" className="img-fluid rounded" width="100" /></td>
                      <td><img src={tour.img2} alt="" className="img-fluid rounded" width="100" /></td>
                      <td><img src={tour.img3} alt="" className="img-fluid rounded" width="100" /></td>
                      <td><img src={tour.img4} alt="" className="img-fluid rounded" width="100" /></td>
                      <td><img src={tour.img6} alt="" className="img-fluid rounded" width="100" /></td>
                      <td>{tour.description}</td>
                      <td>
                        <div className="d-flex flex-column flex-sm-row gap-1">
                          <Link to="/Add" className="btn btn-sm btn-success">Add</Link>
                          <Link to={`/Edit/${tour._id}`} className="btn btn-sm btn-warning">Edit</Link>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(tour._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Contacts Section */}
          {activeSection === 'contacts' && (
            <div className="table-responsive">
              <h4>Contact List</h4>
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Bookings Section */}
          {activeSection === 'bookings' && (
            <div className="table-responsive">
              <h4>Booking List</h4>
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Pin</th>
                    <th>Adult</th>
                    <th>Child</th>
                    <th>Old</th>
                    <th>Food</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Cost</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking._id}>
                      <td>{booking.firstName}</td>
                      <td>{booking.lastName}</td>
                      <td>{booking.email}</td>
                      <td>{booking.phone}</td>
                      <td>{booking.city}</td>
                      <td>{booking.state}</td>
                      <td>{booking.pin}</td>
                      <td>{booking.adult}</td>
                      <td>{booking.child}</td>
                      <td>{booking.old}</td>
                      <td>{booking.food}</td>
                      <td>{booking.from}</td>
                      <td>{booking.to}</td>
                      <td>{booking.cost}</td>
                      <td>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
