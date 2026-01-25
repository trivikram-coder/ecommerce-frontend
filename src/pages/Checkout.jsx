import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/checkout.css";
import {apiUrl} from "../service/api";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "";
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const itemBuy = location.state?.items ?? location.state?.item;

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  /* ================= CALCULATE TOTAL ================= */
  const calculateTotal = (items) =>
    items.reduce((acc, item) => {
      const price = item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
      return acc + price * (item.quantity || 1);
    }, 0);

  /* ================= INIT CART ================= */
  useEffect(() => {
    if (itemBuy && Array.isArray(itemBuy)) {
      setCart(itemBuy);
      setTotal(calculateTotal(itemBuy));
    } else if (itemBuy) {
      const singleItem = { ...itemBuy, quantity: itemBuy.quantity || 1 };
      setCart([singleItem]);
      setTotal(calculateTotal([singleItem]));
    } else {
      fetch(`${apiUrl}/cart/get`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setCart(data || []);
          setTotal(calculateTotal(data || []));
          if (!data || data.length === 0) {
            toast.info("Your cart is empty");
            navigate("/products");
          }
        })
        .catch(() => toast.error("Failed to load cart"));
    }
  }, [itemBuy, token, navigate]);

  /* ================= QUANTITY UPDATE ================= */
  const updateQuantity = (id, type) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        let qty = item.quantity || 1;
        qty = type === "inc" ? qty + 1 : Math.max(1, qty - 1);
        return { ...item, quantity: qty };
      }
      return item;
    });

    setCart(updatedCart);
    setTotal(calculateTotal(updatedCart));
  };

  /* ================= FORM HANDLER ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ================= PLACE ORDER (BACKEND) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderDate = new Date();
    const expectedDate = new Date(orderDate);
    expectedDate.setDate(orderDate.getDate() + 5);

    const newOrder = {
    
      name: formData.name,
      email: formData.email,
      items: cart,
      totalAmount: total,
      orderDate: orderDate.toLocaleDateString(),
      expectedDelivery: expectedDate.toLocaleDateString(),
      status: "Processing",
    };

    try {
      const res = await fetch(`${apiUrl}/orders/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        toast.error("Failed to place order");
        return;
      }

      // ✅ Clear cart
      localStorage.removeItem(`cart${storedUser.id}`);
      window.dispatchEvent(new Event("storage"));

      toast.success("Order placed successfully!");
      navigate("/order-placed", { state: { order: newOrder } });
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Something went wrong while placing order");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold checkout-title">Checkout</h2>

      <div className="row">
        {/* LEFT */}
        <div className="col-lg-7">
          <div className="card p-4 shadow-lg">
            <h4 className="text-primary mb-4">Billing Details</h4>

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Email</label>
                  <input
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <input
                className="form-control mb-3"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="ZIP"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <hr />

              <h4 className="text-primary mb-3">Payment</h4>
              <input
                className="form-control mb-3"
                placeholder="Card Number"
                name="cardNumber"
                onChange={handleChange}
                required
              />

              <div className="row mb-4">
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="MM/YY"
                    name="expiry"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="CVV"
                    name="cvv"
                    type="password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button className="btn btn-success w-100">
                Pay ₹{total.toFixed(2)}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-5">
          <div className="card p-4 shadow-lg">
            <h4 className="text-primary mb-3">Order Summary</h4>

            {cart.map((item) => {
              const price =
                item.discountPrice ?? item.offerPrice ?? item.price ?? 0;

              return (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <div>
                    <strong>{item.title || item.name}</strong>
                    <div className="quantity-controls mt-1">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, "dec")}
                      >
                        −
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, "inc")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <strong>₹{(price * item.quantity).toFixed(2)}</strong>
                </div>
              );
            })}

            <hr />
            <h5 className="d-flex justify-content-between">
              <span>Total</span>
              <span className="text-danger">₹{total.toFixed(2)}</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
