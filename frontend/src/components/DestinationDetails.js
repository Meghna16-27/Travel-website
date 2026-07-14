import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel, CarouselContent, CarouselItem } from "./Carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { useRef } from "react";
const cityDistances = {
  paris: 2220,
  tokyo: 1510,
  "new york": 3160,
  sydney: 1990,
  switzerland: 1520,
  maldives: 1020,
  dubai: 1950,
  bali: 1940,
};

function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [cost, setCost] = useState(null);
  const navigate = useNavigate();
  const packageref= useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/destinations/${id}`)
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
  const galleryImages = [destination.img2,destination.img3,destination.img4,destination.img6,destination.img7].filter(Boolean);


  

  const highlights = destination.highlights || [
    {
      title: "Scenic Beauty",
      text: "Experience breathtaking landscapes, iconic landmarks, and unforgettable views.",
    },
    {
      title: "Comfortable Stays",
      text: "Enjoy premium hotels and cozy accommodations chosen for convenience and comfort.",
    },
    {
      title: "Local Flavors",
      text: "Savor curated food experiences with authentic local cuisine and gourmet touches.",
    },
    {
      title: "Guided Adventures",
      text: "Travel with expert guides through the best attractions and hidden gems.",
    },
  ];

  return (
    <div className="container py-5 glass-card">
      <div className="destination-hero mb-4">
        <div className="destination-hero-content">
          {/* <span className="destination-badge">Check Packages</span> */}
          <button className="destination-badge"
          onClick={()=>
            packageref.current?.scrollIntoView({
              behavior:"smooth",
              block:"start",
            })
          }>
            Check Packages
          </button>
          <h2 className="mb-3 fw-bold">{destination.title}</h2>
          <p className="lead mb-0">
            {destination.description || "No description available."}
          </p>
        </div>
        <img
          src={destination.img1}
          alt={destination.title}
          className="destination-hero-image"
        />
      </div>

      {/* Tour Highlights */}
      <div className="my-5">
        <h4 className="fw-semibold mb-4">Tour Highlights</h4>
        <p className="text-muted mb-4">
          Every itinerary is designed to make your journey smooth, memorable, and full of discovery.
        </p>

        <div className="row g-3">
          {highlights.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6">
              <div className="highlight-box">
                <div>
                  <h6 className="mb-2">{item.title}</h6>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <section className="py-4 overflow-hidden">
        <h4 className="fw-semibold mb-4">Gallery</h4>
        <Carousel
          opts={{
            loop: true,
            dragFree: true,
          }}
          plugins={[
            AutoScroll({
              speed: 1.2,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-100"
        >
          <CarouselContent className="-ml-4">
            {/* Duplicate the images array [...galleryImages, ...galleryImages] so there are 6 items to scroll */}
            {[...galleryImages, ...galleryImages].map((img, index) => (
              <CarouselItem
                key={index}
                className="pl-4 shadow-pop"
                style={{
                  flex: "0 0 33.333%",
                  minWidth: "280px",
                  marginRight: "20px",
                }}
              >
                <img
                  src={img}
                  alt={`Place ${index + 1}`}
                  className="img-fluid rounded shadow w-100"
                  style={{ objectFit: "cover", height: "250px" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

     

      {/* Tour Packages Section */}
      <section className="py-5" ref={packageref}>
        <h4 className="fw-semibold mb-4">Our Packages</h4>
        <div className="row g-4">
          {[
            {
              name: "Budget Explorer",
              duration: "3 Days / 2 Nights",
              price: cost ? cost * 1.2 : null,
              features: [
                "Standard hotel",
                "All meals included",
                "Guided local tour",
              ],
            },
            {
              name: "Classic Vacation",
              duration: "5 Days / 4 Nights",
              price: cost ? cost * 1.5 : null,
              features: [
                "3-star hotel",
                "All meals included",
                "City excursions",
              ],
            },
            {
              name: "Luxury Experience",
              duration: "7 Days / 6 Nights",
              price: cost ? cost * 2.0 : null,
              features: ["5-star resort", "Private tours", "Gourmet dining"],
            },
          ].map((pkg, index) => (
            <div key={index} className="col-md-4">
              <div className="card shadow h-100 tour-package-card">
                <div
                  className="card-body"
                  style={{ backgroundColor: "#f4fff7" }}
                >
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
                          cost: Math.round(pkg.price),
                        },
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
