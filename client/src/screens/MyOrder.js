import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        try {
            const response = await fetch(`http://localhost:3100/api/myOrderData`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail })
            });

            const data = await response.json();
            setOrderData(data.orderData);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    const handleOrderClick = (order) => {
        navigate("/invoice", { state: { order, total: order.reduce((sum, item) => sum + item.price, 0) } });
    };

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.order_data && orderData.order_data.length > 0 ? (
                        orderData.order_data.slice(0).reverse().map((order, index) => (
                            <div key={index}>
                                {order[0]?.Order_date && (
                                    <div className='m-auto mt-5'>
                                        <strong>{order[0].Order_date}</strong>
                                        <hr />
                                    </div>
                                )}
                                <div className='d-flex flex-wrap'>
                                    {order.map((item, itemIndex) => (
                                        item.Order_date ? null : (
                                            <div 
                                                key={itemIndex} 
                                                className='col-12 col-md-6 col-lg-4'
                                                onClick={() => handleOrderClick(order)} // Redirect on click
                                                style={{ cursor: "pointer" }}
                                            >
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{item.qty}</span>
                                                            <span className='m-1'>{item.size}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="m-5 w-100 text-center fs-3">No orders found!</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
