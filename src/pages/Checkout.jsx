import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/checkout.css'; // 🔥 New custom CSS

const Checkout = () => {
    const location = useLocation();
    // 🔥 Use a safe fallback for token
    const token = localStorage.getItem("token") || ""; 
    // This can be a single item or an array of cart items
    const itemBuy = location.state?.items ?? location.state?.item; 
    
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    // Fetches cart items or sets single item from state
    useEffect(() => {
        const calculateTotal = (items) => {
            return items.reduce((acc, item) => {
                const price = item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
                return acc + price * (item.quantity || 1);
            }, 0);
        };

        if (itemBuy && Array.isArray(itemBuy)) {
            // Full cart from state (e.g., from Cart page)
            setCart(itemBuy);
            setTotal(calculateTotal(itemBuy));
        } else if (itemBuy) {
            // Single product (e.g., from Buy Now button)
            const singleItem = { ...itemBuy, quantity: itemBuy.quantity || 1 };
            setCart([singleItem]);
            setTotal(calculateTotal([singleItem]));
        } else {
            // No data passed, fallback to fetch from backend/localStorage
            fetch("https://spring-server-0m1e.onrender.com/cart/get", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => res.json())
                .then((data) => {
                    const fetchedCart = Array.isArray(data) ? data : [];
                    setCart(fetchedCart);
                    setTotal(calculateTotal(fetchedCart));
                    if (fetchedCart.length === 0) {
                        toast.info("Your cart is empty. Redirecting to products.");
                        navigate('/products');
                    }
                })
                .catch((err) => console.error("Error fetching cart:", err));
        }
    }, [itemBuy, token, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            toast.error("Cannot place an empty order.");
            return;
        }

        const orderDate = new Date();
        const expectedDate = new Date(orderDate);
        expectedDate.setDate(orderDate.getDate() + 5); // 5-day delivery

        const newOrder = {
            id: Date.now(), // Unique ID for keying/cancellation
            name: formData.name,
            email: formData.email,
            items: cart,
            totalAmount: total,
            orderDate: orderDate.toLocaleDateString(),
            expectedDelivery: expectedDate.toLocaleDateString(),
            status: "Processing"
        };

        // Fetch previous orders
        const storedUserId = JSON.parse(localStorage.getItem("user") || "{}").id;
        const ordersKey = `orders_${storedUserId}`;
        const previousOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];

        // Add new order
        previousOrders.push(newOrder);

        // Save back to localStorage
        localStorage.setItem(ordersKey, JSON.stringify(previousOrders));

        // Clear cart from local storage (if needed, adjust to match backend clear logic)
        localStorage.removeItem(`cart${storedUserId}`);
        
        // Notify Layout component to update header count (Cart count should be 0)
        window.dispatchEvent(new Event("storage"));

        toast.success("Order Placed Successfully!");
        navigate('/order-placed', { state: { order: newOrder } });
    };

    if (cart.length === 0 && !itemBuy) {
        // Render nothing or a spinner while loading/redirecting
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container py-5">
            <h2 className="text-center mb-5 fw-bold checkout-title">Checkout</h2>
            <div className="row">
                
                {/* Billing and Payment Details - Left Column */}
                <div className="col-lg-7">
                    <div className="card checkout-card p-4 shadow-lg mb-4">
                        <h4 className="mb-4 text-primary">Billing & Shipping Details</h4>
                        <form onSubmit={handleSubmit}>
                            
                            {/* Personal Info Row */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Address Row */}
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Apartment, street, city" required />
                            </div>

                            {/* City/Zip Row */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="zip" className="form-label">ZIP / Postal Code</label>
                                    <input type="text" className="form-control" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
                                </div>
                            </div>

                            <hr className="my-4" />
                            
                            {/* Payment Info */}
                            <h4 className="mb-4 text-primary">Payment Details</h4>
                            
                            {/* Card Number Row */}
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Credit Card Number</label>
                                <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                            </div>
                            
                            {/* Expiry/CVV Row */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label htmlFor="expiry" className="form-label">Expiry Date (MM/YY)</label>
                                    <input type="text" className="form-control" id="expiry" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="cvv" className="form-label">CVV</label>
                                    <input type="password" className="form-control" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
                                </div>
                            </div>
                            
                            <button type="submit" className="btn btn-success w-100 place-order-btn">
                                Pay ₹{total.toFixed(2)} & Place Order
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Summary - Right Column */}
                <div className="col-lg-5">
                    <div className="card summary-card-sticky p-4 shadow-lg">
                        <h4 className="card-title mb-4 border-bottom pb-2 text-primary">Order Summary</h4>
                        <ul className="list-group mb-3 order-items-list">
                            {cart.map((item) => {
                                const name = item.title ?? item.name ?? "Unnamed";
                                const price = item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
                                const quantity = item.quantity || 1;
                                const subtotal = price * quantity;
                                return (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                                        <div className="item-name-qty">
                                            <span className="fw-medium">{name}</span> 
                                            <span className="text-muted small ms-2">(x{quantity})</span>
                                        </div>
                                        <strong className="text-dark">₹{subtotal.toFixed(2)}</strong>
                                    </li>
                                );
                            })}
                            
                            {/* Fixed costs can be added here */}
                            <li className="list-group-item d-flex justify-content-between">
                                <span className="fw-medium">Shipping:</span>
                                <strong>Free</strong>
                            </li>

                            {/* Total */}
                            <li className="list-group-item d-flex justify-content-between total-row">
                                <h5 className="mb-0 text-primary">Total Payable:</h5>
                                <h5 className="mb-0 fw-bold text-danger">₹{total.toFixed(2)}</h5>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;