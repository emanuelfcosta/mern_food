import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MyOrder = () => {
    const [orderData, setorderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            const res = await fetch("http://localhost:3004/api/v1/orders/myOrderData", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            const response = await res.json();
            console.log("API Response:", response);
            setorderData(response);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {Object.keys(orderData).length === 0 ? (
                        <div>Loading...</div>
                    ) : (
                        orderData.order_data && orderData.order_data.length > 0 ? (
                            orderData.order_data.map((order, index) => {
                                if (Array.isArray(order[0])) {
                                    return order[0].map((arrayData, idx) => (
                                        <div key={idx}>
                                            {arrayData.Order_date ? (
                                                <div className="m-auto mt-5">
                                                    <span>{arrayData.Order_date}</span>
                                                    <hr />
                                                </div>
                                            ) : (
                                                <div className="col-12 col-md-6 col-lg-3">
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                            <div className="container w-100 p-0" style={{ height: "38px" }}>
                                                                <span className="m-1">{order[1]}</span>
                                                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                    ₹{arrayData.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ));
                                }
                                return null;
                            })
                        ) : (
                            <div>No orders available</div>
                        )
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyOrder;
