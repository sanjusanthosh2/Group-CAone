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

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
      alert("Please fill in all payment details.");
      return;
    }

    // Simulate successful payment
    alert("Payment Successful!");

    // Redirect to Invoice page with order details
    navigate("/invoice", { state: { order, total } });
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
