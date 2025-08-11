import React from "react";

const Thankyou = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="text-center">
        <h1 className="text-success mb-3">🎉 Thank You!</h1>
        <h4>Your payment has been successfully processed.</h4>
        <p className="mt-3">We’ve sent you a confirmation email with the booking details.</p>
      </div>
    </div>
  );
};

export default Thankyou;
