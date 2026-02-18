import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/checkout.css";
import { apiUrl } from "../service/api";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "";
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const itemBuy = location.state?.items ?? location.state?.item;

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState({
    name: storedUser?.userName || "",
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
      const price =
        item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
      return acc + price * (item.quantity || 1);
    }, 0);

  /* ================= INIT CART ================= */
  useEffect(() => {
    if (itemBuy && Array.isArray(itemBuy)) {
      setCart(itemBuy);
      setTotal(calculateTotal(itemBuy));
    } else if (itemBuy) {
      const singleItem = {
        ...itemBuy,
        quantity: itemBuy.quantity || 1,
      };
      setCart([singleItem]);
      setTotal(calculateTotal([singleItem]));
    } else {
      fetch(`${apiUrl}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const items = data?.items || [];
          setCart(items);
          setTotal(calculateTotal(items));

          if (items.length === 0) {
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
      const itemId = item._id || item.cartId;

      if (itemId === id) {
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

  /* ================= PLACE ORDER ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderDate = new Date();
    const expectedDate = new Date();
    expectedDate.setDate(orderDate.getDate() + 5);

    /* 🔥 Format items properly */
    const formattedItems = cart.map((item) => ({
      productId: item.productId,
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.discountPrice ?? item.price,
      quantity: item.quantity,
    }));

    /* 🔐 Safe Payment Snapshot */
    const last4 = formData.cardNumber.slice(-4);

    const newOrder = {
    
      name: formData.name,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      items: formattedItems,
      totalAmount: total,
      orderDate: orderDate.toISOString(),
      expectedDelivery: expectedDate.toISOString(),
      status: "PLACED",
      payment: {
        method: "CARD",
        status: "PAID",
        transactionId: "TXN" + Date.now(),
        last4: last4,
      },
    };

    try {
      const res = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newOrder),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to place order");
        return;
      }

      /* ✅ Clear cart */
      localStorage.removeItem("cart");
      localStorage.removeItem(`cartIds_${storedUser.id}`);
      window.dispatchEvent(new Event("storage"));

      toast.success("Order placed successfully!");
      navigate("/order-placed", { state: { order: data.order } });

    } catch (err) {
      console.error("Order error:", err);
      toast.error("Something went wrong while placing order");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold checkout-title">
        Checkout
      </h2>

      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-lg-7">
          <div className="card p-4 shadow-lg">
            <h4 className="text-primary mb-4">Billing Details</h4>

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />

              <input
                className="form-control mb-3"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />

              <input
                className="form-control mb-3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />

              <input
                className="form-control mb-3"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />

              <input
                className="form-control mb-3"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="ZIP Code"
                required
              />

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

        {/* RIGHT SIDE */}
        <div className="col-lg-5">
          <div className="card p-4 shadow-lg">
            <h4 className="text-primary mb-3">Order Summary</h4>

            {cart.map((item) => {
              const price =
                item.discountPrice ?? item.offerPrice ?? item.price ?? 0;
              const id = item._id || item.cartId;

              return (
                <div
                  key={id}
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <div>
                    <strong>{item.title}</strong>
                    <div className="quantity-controls mt-1">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(id, "dec")}
                      >
                        −
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(id, "inc")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <strong>
                    ₹{(price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              );
            })}

            <hr />
            <h5 className="d-flex justify-content-between">
              <span>Total</span>
              <span className="text-danger">
                ₹{total.toFixed(2)}
              </span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
