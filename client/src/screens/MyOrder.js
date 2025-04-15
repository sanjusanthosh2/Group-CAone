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
                                <div className='m-auto mt-5'>
                                    <strong>{order.Order_date}</strong>
                                    <hr />
                                </div>
                                <div className='d-flex flex-wrap'>
                                    {order.items && Array.isArray(order.items) ? (
                                        order.items.map((item, itemIndex) => (
                                            <div 
                                                key={itemIndex} 
                                                className='col-12 col-md-6 col-lg-4'
                                                onClick={() => handleOrderClick(order.items)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "460px" }}>
                                                    {item.img && (
                                                        <div style={{ height: "200px", overflow: "hidden" }}>
                                                            <img 
                                                                src={item.img} 
                                                                className="card-img-top" 
                                                                alt={item.name}
                                                                style={{ 
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit: "cover"
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className='container w-100 p-0'>
                                                            <span className='m-1'>Qty: {item.qty}</span>
                                                            <span className='m-1'>Size: {item.size}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : null}
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
