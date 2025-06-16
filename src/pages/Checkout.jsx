import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const Checkout = () => {
  const location=useLocation();
  const itemBuy=location.state?.item;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
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
  const navigate = useNavigate();

 useEffect(() => {
  if (itemBuy) {
    // Handle single product "Buy Now"
    const singleItem = { ...itemBuy, quantity: itemBuy.quantity || 1 };
    setCart([singleItem]);
    setTotal(singleItem.offerPrice * singleItem.quantity);
  } else {
    // Handle full cart checkout
    fetch("https://backend-server-3-ycun.onrender.com/cart/get")
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
        const totalPrice = data.reduce((acc, item) => acc + (item.offerPrice * item.quantity), 0);
        setTotal(totalPrice);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }
}, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    localStorage.removeItem('cart');
    toast.success("Order Placed Successfully")
    navigate('/order-placed');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Billing Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Zip Code</label>
              <input type="text" className="form-control" name="zip" value={formData.zip} onChange={handleChange} required />
            </div>
            <h4>Payment Details</h4>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input type="text" className="form-control" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
            </div>
            <div className="mb-3 d-flex">
              <div className="me-2">
                <label className="form-label">Expiry</label>
                <input type="text" className="form-control" name="expiry" value={formData.expiry} onChange={handleChange} required />
              </div>
              <div>
                <label className="form-label">CVV</label>
                <input type="text" className="form-control" name="cvv" value={formData.cvv} onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100">Place Order</button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                <span>{item.title} (x{item.quantity})</span>
                <strong>${(item.offerPrice * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between bg-light">
              <strong>Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
