import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const cityDistances = {
  "paris": 2220,
  "tokyo": 1510,
  "new york": 3160,
  "sydney": 1990,
  "switzerland": 1520,
  "maldives": 1020,
  "dubai": 1950,
  "bali": 1940
};

function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [cost, setCost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/destinations/${id}`)
      .then((res) => {
        const data = res.data;
        setDestination(data);
        const cityKey = data.title?.toLowerCase().trim();
        const dist = cityDistances[cityKey];
        if (!dist) console.warn(`Distance not found for: ${cityKey}`);
        setCost(dist ? dist * 50 : null);
      })
      .catch((err) => console.error("Error fetching detail:", err));
  }, [id]);

  if (!destination) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-3 text-center fw-bold">{destination.title}</h2>

      <img
        src={destination.img1}
        alt={destination.title}
        className="img-fluid rounded shadow mb-4 w-100"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />

      <p className="lead">{destination.description || "No description available."}</p>

      {/* Tour Highlights */}
      <div className="my-5">
        <h4 className="fw-semibold mb-3">Tour Highlights</h4>
        <ul className="list-unstyled">
          <li>Scenic beauty and cultural heritage</li>
          <li>Premium hotels & comfortable stays</li>
          <li>Delicious local cuisine and curated food experiences</li>
          <li>Guided city tours and local excursions</li>
        </ul>
      </div>

      {/* Gallery */}
      <section className="py-4">
        <h4 className="fw-semibold mb-4">Gallery</h4>
        <div className="row g-4">
          {[destination.img2, destination.img3, destination.img4].map((img, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 shadow-pop">
              <img
                src={img}
                alt={`Place ${index + 1}`}
                className="img-fluid rounded shadow w-100"
                style={{ objectFit: 'cover', height: '250px' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Stay Experience */}
      <section className="py-5">
        <h4 className="fw-semibold mb-4">Stay & Food Experience</h4>
        <div className="row g-4">
          <div className="col-sm-6 col-md-4">
            <img src={destination.img6} alt="Stay" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6">
            <p className="mt-2">
              Our tour packages include comfortable and carefully selected hotels to suit every
              traveler's needs, from budget-friendly options to luxurious resorts. Each hotel
              offers modern amenities like free Wi-Fi, spacious rooms, in-house dining, and
              excellent customer service. Located close to major attractions, these stays ensure
              convenience and relaxation, making your travel experience smooth and memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Food Experience */}
      <section className="py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <p className="mt-2">
              Our tour packages offer exceptional food facilities designed to cater to every
              traveler’s taste and comfort. Guests can enjoy a variety of local and international
              cuisines, with many accommodations providing complimentary breakfast, à la carte
              dining, and 24/7 room service. Whether you're craving authentic local flavors or
              comforting familiar meals, our partner hotels ensure a delightful culinary experience
              throughout your stay.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="https://media.istockphoto.com/id/1158623408/photo/indian-hindu-veg-thali-food-platter-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=WOCrpfQJRlyY9W84K4iAaIfJVCWbIs_UroFYKK9y1Qg="
              alt="Food"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* Tour Packages Section */}
      <section className="py-5">
        <h4 className="fw-semibold mb-4">Our Packages</h4>
        <div className="row g-4">
          {[
            {
              name: "Budget Explorer",
              duration: "3 Days / 2 Nights",
              price: cost ? cost * 1.2 : null,
              features: ["Standard hotel", "All meals included", "Guided local tour"],
            },
            {
              name: "Classic Vacation",
              duration: "5 Days / 4 Nights",
              price: cost ? cost * 1.5 : null,
              features: ["3-star hotel", "All meals included", "City excursions"],
            },
            {
              name: "Luxury Experience",
              duration: "7 Days / 6 Nights",
              price: cost ? cost * 2.0 : null,
              features: ["5-star resort", "Private tours", "Gourmet dining"],
            }
          ].map((pkg, index) => (
            <div key={index} className="col-md-4">
              <div className="card shadow h-100 tour-package-card">
                <div className="card-body" style={{ backgroundColor: "#f4fff7" }}>
                  <h5 className="card-title fw-bold">{pkg.name}</h5>
                  <p className="text-muted">{pkg.duration}</p>
                  <ul className="mb-3">
                    {pkg.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  <h6 className="fw-bold text-success">
                    {pkg.price !== null
                      ? `₹${Math.round(pkg.price).toLocaleString()}`
                      : "Price not available"}
                  </h6>
                  <button
                    className="btn btn-success mt-3"
                    onClick={() =>
                      navigate("/booknow", {
                        state: {
                          title: `${destination.title} - ${pkg.name}`,
                          img: destination.img1,
                          description: `${pkg.duration} | ${pkg.features.join(", ")}`,
                          cost: Math.round(pkg.price)
                        }
                      })
                    }
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Book Now CTA 
      <div className="text-center mt-4">
        <h5>
          Estimated Travel Cost:{" "}
          <span className="text-success fw-bold">
            {cost !== null ? `₹${cost.toLocaleString()}` : "Not available"}
          </span>
        </h5>
        <button
          className="btn btn-success mt-3"
          onClick={() =>
            navigate("/booknow", {
              state: {
                title: destination.title,
                img: destination.img1,
                description: destination.description,
                cost: cost
              }
            })
          }
        >
          Book Now
        </button>
        
      </div>
      */}
    </div>
  );
}

export default DestinationDetails;
