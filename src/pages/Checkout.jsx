import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const location = useLocation();
  const itemBuy = location.state?.item;
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

  useEffect(() => {
    if (itemBuy) {
      // Single item buy
      const singleItem = { ...itemBuy, quantity: itemBuy.quantity || 1 };
      const price = singleItem.discountPrice ?? singleItem.offerPrice ?? singleItem.price ?? 0;
      setCart([singleItem]);
      setTotal(price * singleItem.quantity);
    } else {
      // Cart items
      fetch("https://backend-server-3-ycun.onrender.com/cart/get")
        .then((res) => res.json())
        .then((data) => {
          setCart(data);
          const totalPrice = data.reduce((acc, item) => {
            const price = item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
            return acc + price * item.quantity;
          }, 0);
          setTotal(totalPrice);
        })
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Order Placed Successfully");
    localStorage.removeItem('cart');
    navigate('/order-placed');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <div className="row">
        {/* Billing Details */}
        <div className="col-md-6">
          <h4>Billing Details</h4>
          <form onSubmit={handleSubmit}>
            {['name', 'email', 'address', 'city', 'zip', 'cardNumber', 'expiry', 'cvv'].map(field => (
              <div className="mb-3" key={field}>
                <label className="form-label">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit" className="btn btn-success w-100">Place Order</button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <ul className="list-group mb-3">
            {cart.map((item) => {
              const price = item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
              const name = item.name ?? item.title ?? "Unnamed Item";
              return (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  <span>{name} (x{item.quantity})</span>
                  <strong>₹{(price * item.quantity).toFixed(2)}</strong>
                </li>
              );
            })}
            <li className="list-group-item d-flex justify-content-between bg-light">
              <strong>Total:</strong>
              <strong>₹{total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
