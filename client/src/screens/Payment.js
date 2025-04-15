import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, total } = location.state || { order: [], total: 0 };

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
      alert("Please fill in all payment details.");
      return;
    }

    try {
      // Get user email from localStorage
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      // Save order to MongoDB
      const response = await fetch("http://localhost:3100/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          order_data: order,
          order_date: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      // If order is saved successfully
      alert("Payment Successful!");
      navigate("/invoice", { state: { order, total } });

    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="text-light">Payment</h2>
      <p className="text-light">Total Amount: ₹{total}/-</p>

      {/* Payment Form */}
      <div className="mt-4 text-light">
        <div className="mb-3">
          <label className="form-label">Cardholder Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="John Doe"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Card Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="1234 5678 9012 3456"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col">
            <label className="form-label">Expiry Date</label>
            <input
              type="text"
              className="form-control"
              placeholder="MM/YY"
              maxLength="5"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="col">
            <label className="form-label">CVV</label>
            <input
              type="password"
              className="form-control"
              placeholder="123"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button className="btn btn-success mt-4" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}
