import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "../components/ContextReducer";

export default function Invoice() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, total } = location.state || { order: [], total: 0 };

  // State for email input
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    dispatch({ type: "DROP" });
  }, [dispatch]);

  const handleSendInvoice = async () => {
    if (!userEmail) {
      alert("Please enter your email.");
      return;
    }

    try {
      const invoiceData = {
        email: userEmail,
        order: order.map((item, index) => ({
          id: index + 1,
          name: item.name,
          quantity: item.qty,
          size: item.size,
          price: item.price,
        })),
        totalPrice: total,
      };

      const response = await fetch("http://localhost:3100/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      });

      if (response.ok) {
        console.log("Invoice sent successfully!");
        alert("Please check your inbox.");
      } else {
        const errorData = await response.json();
        console.error("Error sending invoice:", errorData);
        alert("Failed to send the invoice.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the invoice.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Invoice</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Starts from 1 instead of 0 */}
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.size}</td>
              <td>₹{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-end">Total Price: ₹{total}/-</h3>

      <div className="mt-4">
        <label htmlFor="email" className="form-label">
          Enter your Email to receive the invoice:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="example@gmail.com"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={handleSendInvoice}>
          Send Invoice
        </button>
      </div>

      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}
