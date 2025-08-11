import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("debit");
  const [step, setStep] = useState("payment"); // 'payment' | 'otp'
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [message, setMessage] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/bookings?email=${email}`);
        const bookings = res.data;
        if (bookings.length > 0) {
          const latest = bookings[bookings.length - 1];
          setBooking(latest);
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    };

    fetchBooking();
  }, [email]);

  const handleGenerateOtp = (e) => {
    e.preventDefault();
    const generated = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(generated);
    setStep("otp");
    setMessage(`Your OTP is: ${generated}`); // Show OTP for simulation/testing
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (parseInt(otp) === generatedOtp) {
      setMessage("Payment Successful!");
       navigate("/thankyou");
      /*setTimeout(() => navigate("/index"), 2000);*/
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  if (!booking) return <p className="text-center mt-5">Loading your booking info...</p>;

  return (
    <div className="container mt-5">
      <div className="row g-4">
        {/* Booking Info */}
        <div className='col-md-6'>
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Booking Confirmation</h2>
            <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>
            <p><strong>From:</strong> {booking.from} <strong>To:</strong> {booking.to}</p>
            <p><strong>Adults:</strong> {booking.adult}, <strong>Children:</strong> {booking.child}, <strong>Seniors:</strong> {booking.old}</p>
            <p><strong>Food:</strong> {booking.food}</p>
            <p><strong>Address:</strong> {booking.address}, {booking.city}, {booking.state} - {booking.pin}</p>
            <p><strong>Total Cost:</strong> ₹{Number(booking.cost).toLocaleString()}</p>
            <p className="text-success fw-bold mt-3">Your booking has been confirmed!</p>
          </div>
        </div>

        {/* Payment Section */}
        <div className='col-md-6'>
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Payment</h2>

            {/* Payment Step */}
            {step === "payment" && (
              <form onSubmit={handleGenerateOtp}>
                <div className="mb-3">
                  <label className="form-label">Select Payment Method</label>
                  <div>
                    {["debit", "netbanking", "upi"].map((method) => (
                      <div className="form-check form-check-inline" key={method}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id={method}
                          value={method}
                          checked={paymentMethod === method}
                          onChange={() => setPaymentMethod(method)}
                        />
                        <label className="form-check-label" htmlFor={method}>
                          {method === "debit" ? "Debit Card" : method === "netbanking" ? "Net Banking" : "UPI"}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conditional Payment Fields */}
                {paymentMethod === "debit" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Card Number</label>
                      <input type="text" className="form-control" required placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Expiry Date</label>
                        <input type="text" className="form-control" required placeholder="MM/YY" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>CVV</label>
                        <input type="password" className="form-control" required placeholder="123" />
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="mb-3">
                    <label className="form-label">Select Bank</label>
                    <select className="form-control" required>
                      <option value="">Choose...</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="union">Union Bank</option>
                      <option value="boi">Bank of India</option>
                    </select>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="mb-3">
                    <label className="form-label">UPI ID</label>
                    <input type="text" className="form-control" required placeholder="example@upi" />
                  </div>
                )}

                <div className="d-grid">
                  <button type="submit" className="btn btn-success">Pay Now</button>
                </div>
              </form>
            )}

            {/* OTP Step */}
            {step === "otp" && (
              <form onSubmit={handleVerifyOtp}>
                <p className="text-primary mb-2"><strong>{message}</strong></p>
                <div className="mb-3">
                  <label className="form-label">Enter OTP</label>
                  <input
                    type="number"
                    className="form-control"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    min="1000"
                    max="9999"
                  />
                </div>
                <button className="btn btn-primary w-100">Verify OTP</button>
              </form>
            )}

            {/* Feedback Message */}
            {step === "otp" && message.includes("Successful") && (
              <div className="alert alert-success mt-3">{message}</div>
            )}
            {step === "otp" && message.includes("Invalid") && (
              <div className="alert alert-danger mt-3">{message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
