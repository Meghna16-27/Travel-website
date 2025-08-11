import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Index = () => {
  const [destinations, setDestinations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/destinations")
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error("Error fetching destinations", err));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/contacts", formData);
      if (res.data.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message.");
    }
  };

  return (
    <>
      {/* Home Section */}
      <section id="home" className="container-fluid py-5">
        <main>
          {/* Banner Section */}
          <section
            className="position-relative text-center text-white d-flex align-items-center justify-content-center"
            style={{
              backgroundImage:
                "url('https://www.relaxgetaways.com/uploads/img/best-time-to-visit-maldives-banner.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "300px",
              height: "50vh",
            }}
          >
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            ></div>
            <div className="position-relative z-1 text-center px-3">
              <h1 className="fw-bold display-4 d-none d-md-block">Welcome to Globetrotter</h1>
              <h2 className="fw-bold d-block d-md-none">Welcome</h2>
              <p className="fs-5">Welcome Tourist</p>
            </div>
          </section>

          {/* Cards Section */}
          <section className="container py-5 mb-5">
            <div className="row" style={{ rowGap: "20px" }}>
              {destinations.map((destination) => (
                <div key={destination._id} className="col-md-3">
                  <div className="card shadow-lg h-100 zoom-hover">
                    <img
                      src={destination.img1}
                      className="card-img-top"
                      alt={destination.title}
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body text-center d-flex flex-column">
                      <h5 className="card-title">{destination.title}</h5>
                      <p className="card-text">
                        {destination.description.length > 100
                          ? destination.description.slice(0, 100) + "..."
                          : destination.description}
                      </p>
                      <Link
                        to={`/destination/${destination._id}`}
                        className="btn btn-primary mt-auto"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </section>

      {/* About Section */}
      <section id="about" className="container py-5 mb-5">
        <div className="container about-page">
          <h1 className="text-center text-primary mb-4">About Us</h1>
          <p className="lead">
            Welcome to <strong>Globetrotter</strong> — your trusted partner in
            exploring the world. We curate personalized travel packages to help
            you discover breathtaking destinations and make unforgettable
            memories.
          </p>
          <p>
            From serene beaches to vibrant cities, we cover it all. Our team
            ensures safe, enjoyable, and affordable journeys with 24/7 support,
            expert guides, and customized plans tailored to your preferences.
          </p>
          <p>
            Join thousands of happy travelers who have trusted us to turn their
            travel dreams into reality!
          </p>
        </div>
      </section>

      {/* Features and Services Section */}
      <section id="services" className="container py-5 ">
        <h1 className="text-center text-primary mb-4 ">Our Features & Services</h1>
        <div className="row g-4">
          {[
            {
              title: "Customized Tours",
              image:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
              description:
                "Personalized travel plans tailored just for you—based on your budget and preferences.",
            },
            {
              title: "24/7 Customer Support",
              image:
                "https://images.unsplash.com/photo-1749741340022-434e924e8312?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
              description:
                "Our dedicated team is always ready to help you—anytime, anywhere.",
            },
            {
              title: "Affordable Pricing",
              image:
                "https://plus.unsplash.com/premium_photo-1664297543985-a0cef55975fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
              description:
                "Enjoy quality travel experiences at unbeatable prices. Best value guaranteed!",
            },
            {
              title: "Luxury Hotel Booking",
              image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
              description:
                "Stay at the best-rated hotels, handpicked for comfort, safety, and scenic views.",
            },
            {
              title: "Delicious Cuisine",
              image:
                "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2R8ZW58MHx8MHx8fDA%3D",
              description:
                "Savor authentic local dishes and world-class dining experiences during your journey.",
            },
            {
              title: "Expert Local Guides",
              image:
                "https://plus.unsplash.com/premium_photo-1716999413632-d90a2e2a2289?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXhwZXJ0JTIwdG91ciUyMGd1aWRlfGVufDB8fDB8fHww",
              description:
                "Discover hidden gems and cultural insights with the help of professional local guides.",
            },
          ].map((service, idx) => (
          <div key={idx} className="col-md-4">
          <div className="card h-100 shadow-sm text-center">
            <div className="img-container position-relative">
              <img
                src={service.image}
                alt={service.title}
                className="card-img-top shadow-pop"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="img-overlay">{service.title}</div>
            </div>
            <div className="card-body">
              <p className="card-text">{service.description}</p>
            </div>
          </div>
        </div>

          ))}
        </div>
      </section>

      {/* Contact Section */}
     <section id="contact" className="container my-5">
        <div className="bg-primary text-white text-center py-5 rounded">
          <h1>Contact Us</h1>
          <p>We’re here to help and answer any questions you might have.</p>
        </div>

        <div className="row g-4 my-5">
          <div className="col-md-5">
            <div className="p-4 bg-light rounded">
              <h4>Office Info</h4>
              <p><strong>Address:</strong> Sector V, Kolkata</p>
              <p><strong>Email:</strong> tours@gmail.com</p>
              <p><strong>Phone:</strong> +91 8777276752</p>
              <p><strong>Branch:</strong> K.N. Sen Road</p>
            </div>
          </div>

          <div className="col-md-7">
            <div className="p-4 bg-white shadow-sm rounded">
              <h4>Send a Message</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                {status && <p className="mt-3">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
